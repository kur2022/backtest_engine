import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import BacktestPanel from '../components/BacktestPanel'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Dashboard(){
  const [session,setSession]=useState(null)

  useEffect(()=>{
    supabase.auth.getSession().then(r=>setSession(r.data.session))
    const { data:sub } = supabase.auth.onAuthStateChange((_event, s)=> setSession(s))
    return ()=> sub?.subscription?.unsubscribe()
  },[])

  if(!session) return <div className="p-8">Please <a href="/auth/login" className="link">login</a> to continue.</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <BacktestPanel session={session} />
    </div>
  )
}
