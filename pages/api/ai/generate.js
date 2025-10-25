import { generateStrategy } from '../../../lib/ai'

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { symbol, params } = req.body
  try{
    const strategy = await generateStrategy(symbol, params)
    res.status(200).json({ strategy })
  } catch(err){
    res.status(500).json({ error: err.message })
  }
}
