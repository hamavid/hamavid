## get summary data of pogo food consumption
import pandas as pd
import numpy as np
import os

os.chdir('/Users/hamavid/Documents/hamavid.com/src/hannah/blog/pogoviz') 
def csv(x):
    datatable = pd.read_csv(x, names=['a','b','c'])
    date=[i for i in datatable.a]
    dry=[i for i in datatable.b]
    wet=[i for i in datatable.c]
    return date, dry, wet #returns a "tuple" in the format (timebase, signal)

file_in='d3pogodata.csv'

date=csv(file_in)[0]
dry=csv(file_in)[1]
wet=csv(file_in)[2]