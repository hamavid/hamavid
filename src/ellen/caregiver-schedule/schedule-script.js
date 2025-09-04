// Global variables
let scheduleData = [];
let lastFetchTime = null;
let parseWarnings = [];

// Google Sheets configuration
const SHEET_ID = '1S4J7ygRtMkfPsMUWLx86BIswAnigjpC-9pGLZSp6H5k';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

// Initialize page
window.addEventListener('load', function() {
    console.log('Public schedule page loaded');
    updateLastCheckTime();
    loadSchedule();
    
    // Update current caregiver every minute
    setInterval(updateCurrentCaregiver, 60000);
    
    // Auto-refresh schedule every 5 minutes
    setInterval(() => {
        // console.log('Auto-refreshing schedule...');
        loadSchedule();
    }, 300000);
    
    // Update last check time every 30 seconds
    setInterval(updateLastCheckTime, 30000);
});

// Update last check time display
function updateLastCheckTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        timeZone: 'America/New_York'
    });
    document.getElementById('lastCheck').textContent = timeStr;
}

// Load schedule from Google Sheets
async function loadSchedule() {
    console.log('Loading schedule from Google Sheets...');
    
    try {
        const response = await fetch(SHEET_URL + '&_=' + Date.now());
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        if (!csvText || csvText.trim().length === 0) {
            throw new Error('Google Sheet is empty');
        }
        
        scheduleData = parseGoogleSheetsData(csvText);
        lastFetchTime = new Date();
        
        cacheScheduleData();
        displaySchedule();
        updateCurrentCaregiver();
        hideError();
        
        if (parseWarnings.length > 0) {
            showParseWarnings();
        }
        
        console.log('Schedule loaded successfully:', scheduleData.length, 'entries');
        console.log('Parse warnings:', parseWarnings.length);
        
    } catch (error) {
        console.error('Failed to load Google Sheets:', error);
        
        // Check if this is a CORS error or local file testing
        if (error.message.includes('CORS') || error.message.includes('fetch') || window.location.protocol === 'file:') {
            handleCORSError();
        } else {
            handleLoadError(error.message);
        }
    }
}

// Parse Google Sheets CSV data
function parseGoogleSheetsData(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const data = [];
    parseWarnings = [];
    
    if (lines.length === 0) {
        throw new Error('No data found in Google Sheet');
    }
    
    console.log('Parsing', lines.length, 'lines from Google Sheets');
    
    let currentWeekStartDate = null;
    let currentDate = null;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const columns = parseCSVLine(line);
        const colA = columns[0] ? columns[0].trim() : '';
        const colB = columns[1] ? columns[1].trim() : '';
        
        //console.log(`Row ${i + 1}: ColA="${colA}", ColB="${colB}"`);
        
        // Skip header row
        if (colB.toLowerCase().includes('schedule') && colA.toLowerCase().includes('startdate')) {
            continue;
        }
        
        // Check for week start date in column A
        if (colA && isDateString(colA)) {
            currentWeekStartDate = parseDate(colA);
            //console.log('Found week start date:', currentWeekStartDate);
            
            // If Column B also has a day on this same row, process it
            if (colB) {
                const dayMatch = colB.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):?\s*$/i);
                if (dayMatch) {
                    const dayName = dayMatch[1];
                    currentDate = getDateForDay(currentWeekStartDate, dayName);
                    //console.log('Found date+day on same row:', dayName, '→', currentDate);
                }
            }
            continue;
        }
        
        // Process schedule data in column B
        if (colB) {
            // Check if this is a date+day combination
            const dateDay = colB.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4})\s*(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):?\s*$/i);
            if (dateDay) {
                currentWeekStartDate = parseDate(dateDay[1]);
                const dayName = dateDay[2];
                currentDate = getDateForDay(currentWeekStartDate, dayName);
                //console.log('Found date+day:', currentWeekStartDate, dayName, '→', currentDate);
                continue;
            }
            
            // Check if this is just a day header
            const dayMatch = colB.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):?\s*$/i);
            if (dayMatch) {
                const dayName = dayMatch[1];
                if (currentWeekStartDate) {
                    currentDate = getDateForDay(currentWeekStartDate, dayName);
                    //console.log('Found day header:', dayName, '→', currentDate);
                } else {
                    parseWarnings.push(`Day "${dayName}" found but no week start date set`);
                }
                continue;
            }
            
            // Check if this is a shift line
            const shiftMatch = colB.match(/^(.+?)\s*-\s*(.+?)\s*:\s*(.+)$/);
            if (shiftMatch && currentDate) {
                const [, startTime, endTime, caregiver] = shiftMatch;
                
                const entry = {
                    date: new Date(currentDate),
                    dateStr: currentDate.toISOString().split('T')[0],
                    startTime: startTime.trim(),
                    endTime: endTime.trim(),
                    caregiver: caregiver.trim(),
                    startDateTime: createDateTime(currentDate, startTime.trim()),
                    endDateTime: createDateTime(currentDate, endTime.trim(), startTime.trim())
                };
                
                data.push(entry);
                //console.log('Added shift:', entry);
            } else if (shiftMatch && !currentDate) {
                parseWarnings.push(`Shift "${colB}" found but no current date set`);
            }
        }
    }
    
    // Filter to show only current and future dates
    const now = new Date();
    const today = new Date(now.toDateString());
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(today.getDate() + 14);
    
    const filteredData = data.filter(entry => {
        return entry.date >= today && entry.date <= twoWeeksFromNow;
    }).sort((a, b) => a.startDateTime - b.startDateTime);
    
    console.log(`Filtered to ${filteredData.length} future entries (from ${data.length} total)`);
    return filteredData;
}

// Parse a single CSV line
function parseCSVLine(line) {
    const columns = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            columns.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    columns.push(current);
    return columns;
}

// Check if string looks like a date
function isDateString(str) {
    return /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(str.trim());
}

// Parse date string like "8/25/25"
function parseDate(dateStr) {
    const parts = dateStr.split('/');
    let [month, day, year] = parts.map(Number);
    
    if (year < 100) {
        year += 2000;
    }
    
    return new Date(year, month - 1, day);
}

// Get date for a specific day of the week
function getDateForDay(weekStartDate, dayName) {
    const days = {
        'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3,
        'friday': 4, 'saturday': 5, 'sunday': 6
    };
    
    const dayOffset = days[dayName.toLowerCase()];
    if (dayOffset === undefined) return null;
    
    const date = new Date(weekStartDate);
    date.setDate(weekStartDate.getDate() + dayOffset);
    return date;
}

// Create datetime object from date and time strings
function createDateTime(date, timeStr, referenceTimeStr = null) {
    const dateTime = new Date(date);
    const timeObj = parseTimeString(timeStr);
    
    if (!timeObj) {
        console.warn('Could not parse time:', timeStr);
        return dateTime;
    }
    
    dateTime.setHours(timeObj.hours, timeObj.minutes, 0, 0);
    
    // Handle overnight shifts
    if (referenceTimeStr) {
        const refTimeObj = parseTimeString(referenceTimeStr);
        if (refTimeObj && timeObj.hours < refTimeObj.hours) {
            dateTime.setDate(dateTime.getDate() + 1);
        }
    }
    
    return dateTime;
}

// Parse time string into hours and minutes
function parseTimeString(timeStr) {
    if (timeStr.toLowerCase().includes('midnight')) {
        return { hours: 0, minutes: 0 };
    }
    
    const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm|AM|PM)?/;
    const match = timeStr.match(timeRegex);
    
    if (!match) return null;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2] || 0);
    const period = match[3] ? match[3].toLowerCase() : null;
    
    if (period === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period === 'am' && hours === 12) {
        hours = 0;
    }
    
    return { hours, minutes };
}

// Show parse warnings
function showParseWarnings() {
    if (parseWarnings.length === 0) return;
    
    const calendar = document.getElementById('calendar');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'cached-warning';
    warningDiv.innerHTML = `
        <strong>⚠️ Parsing Warnings (${parseWarnings.length}):</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
            ${parseWarnings.map(warning => `<li>${warning}</li>`).join('')}
        </ul>
        <small>These entries were skipped. Check your Google Sheet format.</small>
    `;
    
    calendar.insertAdjacentElement('beforebegin', warningDiv);
}

// Get current caregiver
function getCurrentCaregiver() {
    if (scheduleData.length === 0) return null;
    
    // Get current Eastern Time
    const now = new Date();
    const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    
    console.log('Current Eastern Time for caregiver check:', easternTime);
    console.log('Current Eastern Time string:', easternTime.toLocaleString());
    
    for (let entry of scheduleData) {
        // Create Eastern time versions of shift start/end
        const shiftStart = new Date(entry.startDateTime);
        const shiftEnd = new Date(entry.endDateTime);
        
        //console.log(`Checking shift: ${entry.caregiver} ${entry.startTime}-${entry.endTime}`);
        //console.log(`Shift times: ${shiftStart.toLocaleString()} to ${shiftEnd.toLocaleString()}`);
        //console.log(`Is ${easternTime.getTime()} >= ${shiftStart.getTime()} && < ${shiftEnd.getTime()}?`);
        
        // Compare times directly (both should be in same timezone context)
        if (easternTime >= shiftStart && easternTime < shiftEnd) {
            console.log('✅ Found current caregiver:', entry.caregiver);
            return entry.caregiver;
        } else {
            //console.log('❌ Not in this shift window');
        }
    }
    
    console.log('No current caregiver found');
    return null;
}

// Update current caregiver display
function updateCurrentCaregiver() {
    const currentElement = document.getElementById('currentCaregiver');
    const current = getCurrentCaregiver();
    
    if (current) {
        currentElement.innerHTML = `<strong>Current caregiver: ${current}</strong>`;
        currentElement.className = 'current-caregiver';
    } else {
        currentElement.innerHTML = 'No caregiver scheduled right now';
        currentElement.className = 'current-caregiver no-one';
    }
}

// Display the schedule
function displaySchedule() {
    const calendar = document.getElementById('calendar');
    
    if (scheduleData.length === 0) {
        calendar.innerHTML = '<div class="no-schedule">No upcoming schedules available</div>';
        return;
    }
    
    // Group by date
    const groupedData = {};
    scheduleData.forEach(entry => {
        const dateKey = entry.dateStr;
        if (!groupedData[dateKey]) {
            groupedData[dateKey] = [];
        }
        groupedData[dateKey].push(entry);
    });
    
    calendar.innerHTML = '';
    const now = new Date();
    const today = new Date(now.toDateString());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    Object.keys(groupedData).sort().forEach(dateKey => {
        const entries = groupedData[dateKey];
        const date = entries[0].date;
        
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        
        if (date.getTime() === today.getTime()) {
            dayCard.classList.add('today');
        } else if (date.getTime() === tomorrow.getTime()) {
            dayCard.classList.add('tomorrow');
        }
        
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const shortDate = date.toLocaleDateString('en-US', { 
            month: 'numeric', 
            day: 'numeric', 
            year: '2-digit' 
        });
        
        let indicator = '';
        if (date.getTime() === today.getTime()) {
            indicator = '<span class="day-indicator today">TODAY</span>';
        } else if (date.getTime() === tomorrow.getTime()) {
            indicator = '<span class="day-indicator tomorrow">TOMORROW</span>';
        }
        
        dayHeader.innerHTML = `${dayName} <span class="day-date">${shortDate}</span> ${indicator}`;
        dayCard.appendChild(dayHeader);
        
        entries.forEach(entry => {
            const shiftDiv = document.createElement('div');
            shiftDiv.className = 'shift';
            
            // Highlight current shift (use same logic as getCurrentCaregiver)
            const now = new Date();
            const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
            const shiftStart = new Date(entry.startDateTime);
            const shiftEnd = new Date(entry.endDateTime);
            
            if (easternTime >= shiftStart && easternTime < shiftEnd) {
                shiftDiv.classList.add('current');
                console.log('Highlighting current shift:', entry.caregiver, entry.startTime + '-' + entry.endTime);
            }
            
            shiftDiv.innerHTML = `
                <div class="shift-time">${entry.startTime} - ${entry.endTime}</div>
                <div class="shift-caregiver">${entry.caregiver}</div>
            `;
            
            dayCard.appendChild(shiftDiv);
        });
        
        calendar.appendChild(dayCard);
    });
    
    // Update last updated time
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastFetchTime) {
        lastUpdatedElement.textContent = `Schedule loaded: ${lastFetchTime.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'America/New_York'
        })} ET`;
    }
}

// Handle load errors
function handleLoadError(errorMessage) {
    console.log('Attempting to load cached data...');
    
    const cachedData = getCachedScheduleData();
    
    if (cachedData && cachedData.data && cachedData.data.length > 0) {
        const cacheAge = new Date() - new Date(cachedData.timestamp);
        const hoursOld = Math.floor(cacheAge / (1000 * 60 * 60));
        
        scheduleData = cachedData.data;
        displaySchedule();
        updateCurrentCaregiver();
        
        const calendar = document.getElementById('calendar');
        const warningClass = hoursOld > 72 ? 'cached-warning old-data' : 'cached-warning';
        const warningDiv = `<div class="${warningClass}">
            ⚠️ Using cached data from ${hoursOld} hours ago. 
            ${hoursOld > 72 ? 'Data may be outdated!' : 'Refresh to get latest updates.'}
        </div>`;
        calendar.insertAdjacentHTML('beforebegin', warningDiv);
        
        document.getElementById('currentCaregiver').innerHTML = 'Using cached data - current caregiver may not be accurate';
        document.getElementById('currentCaregiver').className = 'current-caregiver error';
        
    } else {
        showError(`Could not load schedule: ${errorMessage}`);
    }
}

// Handle CORS error
function handleCORSError() {
    console.log('CORS error detected - showing local testing option');
    
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = `
        <div class="local-testing-section">
            <h3>🚧 Local Testing Mode</h3>
            <p>For local testing, you can paste CSV data directly:</p>
            <textarea id="csvPasteArea" placeholder="Paste your Google Sheets CSV export here..." style="width: 100%; height: 150px; margin: 15px 0; padding: 10px; border: 2px solid #e1e8ed; border-radius: 8px; font-family: monospace; font-size: 14px;"></textarea>
            <button onclick="loadFromPastedCSV()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Load Schedule</button>
            <div style="margin-top: 15px; padding: 15px; background: #fff3cd; border-radius: 8px; font-size: 14px; color: #856404;">
                <strong>Note:</strong> This is for local testing only. Once uploaded to your website, the Google Sheets will load automatically.
            </div>
        </div>
    `;
    
    const cachedData = getCachedScheduleData();
    if (cachedData && cachedData.data && cachedData.data.length > 0) {
        calendar.insertAdjacentHTML('beforeend', `
            <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
                <strong>Or:</strong> <button onclick="loadCachedData()" style="background: #2ecc71; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-left: 10px;">Use Cached Data</button>
                <small style="display: block; margin-top: 5px; color: #666;">Last cached: ${new Date(cachedData.timestamp).toLocaleString()}</small>
            </div>
        `);
    }
}

// Load from pasted CSV
function loadFromPastedCSV() {
    const csvText = document.getElementById('csvPasteArea').value.trim();
    
    if (!csvText) {
        alert('Please paste CSV data first');
        return;
    }
    
    try {
        scheduleData = parseGoogleSheetsData(csvText);
        lastFetchTime = new Date();
        
        cacheScheduleData();
        displaySchedule();
        updateCurrentCaregiver();
        hideError();
        
        console.log('Schedule loaded from pasted CSV:', scheduleData.length, 'entries');
        
    } catch (error) {
        alert('Error parsing CSV: ' + error.message);
        console.error('CSV parse error:', error);
    }
}

// Load cached data
function loadCachedData() {
    const cachedData = getCachedScheduleData();
    
    if (cachedData && cachedData.data) {
        scheduleData = cachedData.data;
        displaySchedule();
        updateCurrentCaregiver();
        hideError();
        
        const calendar = document.getElementById('calendar');
        const cacheAge = new Date() - new Date(cachedData.timestamp);
        const hoursOld = Math.floor(cacheAge / (1000 * 60 * 60));
        
        calendar.insertAdjacentHTML('beforebegin', `
            <div class="cached-warning">
                ℹ️ Using cached data from ${hoursOld} hours ago
            </div>
        `);
    }
}

// Show error message
function showError(message) {
    document.getElementById('errorDetails').textContent = message;
    document.getElementById('errorSection').style.display = 'block';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('currentCaregiver').innerHTML = '❌ Schedule unavailable';
    document.getElementById('currentCaregiver').className = 'current-caregiver error';
}

// Hide error message
function hideError() {
    document.getElementById('errorSection').style.display = 'none';
    document.getElementById('calendar').style.display = 'grid';
}

// Cache schedule data
function cacheScheduleData() {
    if (scheduleData.length === 0) return;
    
    const cacheData = {
        data: scheduleData,
        timestamp: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('scheduleCache', JSON.stringify(cacheData));
        console.log('Schedule data cached');
    } catch (error) {
        console.warn('Failed to cache data:', error);
    }
}

// Get cached schedule data
function getCachedScheduleData() {
    try {
        const cached = localStorage.getItem('scheduleCache');
        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        console.warn('Failed to load cached data:', error);
        return null;
    }
}

// Manual refresh function
window.refreshSchedule = loadSchedule;