export async function generateStrategy(symbol, params={}){
  return {
    name: `MA Crossover ${symbol}`,
    description: `Buy when 10-day SMA > 30-day SMA, sell when opposite.`,
    params: { short: 10, long: 30 },
    expected: "Test on historical data and tune parameters before live trading"
  }
}
