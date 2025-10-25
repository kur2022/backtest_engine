import Link from 'next/link'
export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Backtest Engine + AI Analyzer (India)</h1>
        <p className="mb-6">Prototype to run backtests and generate strategies for Indian indices & stocks.</p>
        <div className="space-x-3">
          <Link href="/auth/login"><a className="btn">Login</a></Link>
          <Link href="/dashboard"><a className="btn-outline">Open Demo</a></Link>
        </div>
      </div>
    </div>
  )
}
