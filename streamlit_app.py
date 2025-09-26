from strategy_generator import generate_rule_based_strategies
from backtest_engine import run_backtest
from data_loader import load_intraday_data

# Load data
data = load_intraday_data()

# Generate strategies
buy_levels = [1.001, 1.002, 1.003]
sell_levels = [0.999, 0.998, 0.997]
strategies = generate_rule_based_strategies(buy_levels, sell_levels)

# Run backtests
for strat in strategies:
    print(f"\n🔍 Testing {strat['name']}")
    result = run_backtest(data, strat['logic'])
    print(f"Profit ₹{result['total_profit']:.2f}, Win Rate {result['win_rate']:.2f}%")
