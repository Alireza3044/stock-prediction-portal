import pandas as pd
import numpy as np
import yfinance as yf
from datetime import datetime

def get_data(ticker: str) -> pd.DataFrame:
    now = datetime.now()
    start = datetime(now.year - 10, now.month, now.day)

    df = yf.download(ticker, start, now)
    if df.empty:
        raise ValueError("No data found for the given ticker.")

    df.columns = df.columns.droplevel(1)
    df.columns.names = ['']
    df = df.reset_index()

    return df
