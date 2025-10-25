// pages/_app.js
import '../styles/globals.css'
import { SessionContextProvider } from '@supabase/ssr'
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
