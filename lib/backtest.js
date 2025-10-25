// lib/backtest.js
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'  // updated import

export async function loadOHLC(symbol, from, to) {
  const file = path.join(process.cwd(), 'lib', 'sample-data', 'NIFTY50_sample.csv')
  const raw = fs.readFileSync(file, 'utf8')
  const rows = parse(raw, { columns: true, skip_empty_lines: true })
  const filtered = rows
    .filter(r => r.Date >= from && r.Date <= to)
    .map(r => ({
      date: r.Date,
      open: +r.Open,
      high: +r.High,
      low: +r.Low,
      close: +r.Close,
      volume: +r.Volume || 0
    }))
  return filtered
}

export async function simpleBacktest(symbol, from = '2020-01-01', to = '2024-12-31') {
  const data = await loadOHLC(symbol, from, to)
  const short = 10, long = 30
  const prices = data.map(d => d.close)

  function sma(arr, n, i) {
    if (i + 1 < n) return null
    const s = arr.slice(i + 1 - n, i + 1).reduce((a, b) => a + b, 0)
    return s / n
  }

  let position = 0
  let entryPrice = 0
  let cash = 100000
  let shares = 0
  const trades = []

  for (let i = 0; i < data.length; i++) {
    const s = sma(prices, short, i)
    const l = sma(prices, long, i)
    if (s === null || l === null) continue

    const date = data[i].date
    const price = data[i].close

    if (s > l && position === 0) {
      shares = Math.floor(cash / price)
      entryPrice = price
      cash -= shares * price
      position = 1
      trades.push({ type: 'BUY', date, price, shares })
    } else if (s < l && position === 1) {
      cash += shares * price
      trades.push({
        type: 'SELL',
        date,
        price,
        shares,
        pnl: (price - entryPrice) * shares
      })
      shares = 0
      position = 0
    }
  }

  const finalValue = cash + shares * (data[data.length - 1]?.close || 0)
  return { symbol, from, to, trades, finalValue, returnPct: ((finalValue - 100000) / 100000) * 100 }
}
