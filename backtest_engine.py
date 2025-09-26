import pandas as pd
import matplotlib.pyplot as plt

def run_backtest(data, strategy_logic, open_col='Open_^NSEBANK', close_col='Close_^NSEBANK', plot=True):
    data = data.copy()
    data['Signal'] = data.apply(strategy_logic, axis=1)
    data['Return'] = 0.0

    for i in range(1, len(data)):
        if data['Signal'].iloc[i] == 'Buy':
            data.at[data.index[i], 'Return'] = data[close_col].iloc[i] - data[open_col].iloc[i]
        elif data['Signal'].iloc[i] == 'Sell':
            data.at[data.index[i], 'Return'] = data[open_col].iloc[i] - data[close_col].iloc[i]

    data['Cumulative'] = data['Return'].cumsum()
    total_trades = len(data[data['Signal'] != 'Hold'])
    profitable_trades = len(data[data['Return'] > 0])
    win_rate = profitable_trades / total_trades * 100 if total_trades > 0 else 0
    total_profit = data['Return'].sum()

    if plot:
        plt.figure(figsize=(10,5))
        plt.plot(data.index, data['Cumulative'], label='Equity Curve')
        plt.title('Backtest Equity Curve')
        plt.xlabel('Time')
        plt.ylabel('Cumulative Profit')
        plt.legend()
        plt.grid()
        plt.show()

    return {
        "total_trades": total_trades,
        "win_rate": win_rate,
        "total_profit": total_profit,
        "data": data
    }
