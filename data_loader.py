import yfinance as yf
import pandas as pd
import requests
from bs4 import BeautifulSoup

def load_intraday_data(symbol="^NSEBANK", interval="15m", period="5d"):
    data = yf.download(symbol, interval=interval, period=period)
    data = data.dropna()
    # Rename columns to match Backtest_Engine expectations
    data.columns = [f"{col}_{symbol}" for col in data.columns]
    return data

def fetch_nse_option_chain(symbol="BANKNIFTY"):
    url = f"https://www.nseindia.com/api/option-chain-indices?symbol={symbol}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    session = requests.Session()
    session.get("https://www.nseindia.com", headers=headers)
    response = session.get(url, headers=headers).json()
    return response['records']['data']

def extract_atm_premiums(data):
    spot_price = data[0]['underlyingValue']
    strikes = [d['strikePrice'] for d in data if 'CE' in d and 'PE' in d]
    atm_strike = min(strikes, key=lambda x: abs(x - spot_price))
    for d in data:
        if d['strikePrice'] == atm_strike and 'CE' in d and 'PE' in d:
            ce = d['CE']['lastPrice']
            pe = d['PE']['lastPrice']
            return ce, pe, atm_strike, spot_price
    return None
