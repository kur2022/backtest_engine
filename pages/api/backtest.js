import { simpleBacktest } from '../../lib/backtest'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { symbol, from, to } = req.body
  try{
    const result = await simpleBacktest(symbol, from, to)
    res.status(200).json(result)
  }catch(e){
    res.status(500).json({ error: e.message })
  }
}
