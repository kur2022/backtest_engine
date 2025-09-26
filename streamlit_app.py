import streamlit as st
import pandas as pd
from data_loader import load_intraday_data
from strategy_generator import generate_rule_based_strategies
from backtest_engine import run_backtest

st.set_page_config(page_title="Backtest Engine", layout="wide")
st.title("📊 Backtest_Engine Dashboard")

# Load data
with st.spinner("Loading intraday data..."):
    data = load_intraday_data()

# Strategy parameters
st.sidebar.header("Strategy Parameters")
buy_thresh = st.sidebar.slider("Buy Threshold", 1.000, 1.005, 1.002, step=0.001)
sell_thresh = st.sidebar.slider("Sell Threshold", 0.995, 1.000, 0.998, step=0.001)

# Generate strategy
strategies = generate_rule_based_strategies([buy_thresh], [sell_thresh])
strategy = strategies[0]

# Run backtest
result = run_backtest(data, strategy['logic'], plot=False)

# Show results
st.subheader(f"🔍 Strategy: {strategy['name']}")
st.metric("Total Trades", result["total_trades"])
st.metric("Win Rate", f"{result['win_rate']:.2f}%")
st.metric("Total Profit", f"₹{result['total_profit']:.2f}")

# Show equity curve
st.line_chart(result["data"]["Cumulative"])
