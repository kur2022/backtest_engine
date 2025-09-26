def generate_rule_based_strategies(buy_levels, sell_levels, open_col='Open_^NSEBANK', close_col='Close_^NSEBANK'):
    strategies = []

    for b in buy_levels:
        for s in sell_levels:
            def strategy(row, b=b, s=s):
                if row[close_col] > row[open_col] * b:
                    return 'Buy'
                elif row[close_col] < row[open_col] * s:
                    return 'Sell'
                else:
                    return 'Hold'
            strategies.append({
                "name": f"Buy>{b}, Sell<{s}",
                "logic": strategy
            })

    return strategies
