def generate_rule_based_strategies(buy_levels, sell_levels):
    strategies = []
    for b in buy_levels:
        for s in sell_levels:
            def strategy_logic(row, buy_thresh=b, sell_thresh=s):
                if row['Close_^NSEBANK'] > row['Open_^NSEBANK'] * buy_thresh:
                    return 'Buy'
                elif row['Close_^NSEBANK'] < row['Open_^NSEBANK'] * sell_thresh:
                    return 'Sell'
                else:
                    return 'Hold'
            strategies.append({
                "name": f"Buy>{b}, Sell<{s}",
                "logic": strategy_logic
            })
    return strategies
