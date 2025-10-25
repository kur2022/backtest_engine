import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Login(){
  const [email,setEmail]=useState('')
  async function signIn(){
    const { error } = await supabase.auth.signInWithOtp({ email })
    if(error) return alert(error.message)
    alert('Magic link sent to ' + email)
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login (Magic link)</h2>
        <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your@email.com" />
        <button className="btn mt-4" onClick={signIn}>Send Magic Link</button>
      </div>
    </div>
  )
}
