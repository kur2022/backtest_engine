import '../styles/globals.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function App({ Component, pageProps }) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
