import { useState } from 'react'

export default function BacktestPanel(){
  const [symbol,setSymbol]=useState('NIFTY 50')
  const [from,setFrom]=useState('2020-01-01')
  const [to,setTo]=useState('2024-12-31')
  const [results,setResults]=useState(null)
  const [loading,setLoading]=useState(false)

  async function runBacktest(){
    setLoading(true)
    const resp = await fetch('/api/backtest', {
      method: 'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ symbol, from, to })
    })
    const data = await resp.json()
    setResults(data)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <input className="input" value={symbol} onChange={e=>setSymbol(e.target.value)} />
        <input className="input" type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <input className="input" type="date" value={to} onChange={e=>setTo(e.target.value)} />
      </div>
      <div>
        <button className="btn" onClick={runBacktest} disabled={loading}>{loading? 'Running...':'Run Backtest'}</button>
      </div>
      {results && (
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Results</h3>
          <pre className="text-sm">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
