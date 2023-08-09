import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import SendTransaction from '@/components/SendTransaction'
import { classNames } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={classNames('relative flex-1 isolate', inter.className)}>
      <Head>
        <title>UseWallet Demo | Proof of State</title>
      </Head>

      <Header />

      <div className="px-6 pt-12 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-beni text-white text-title-6xl tracking-wide xs:text-title-7xl sm:text-title-9xl md:text-title-10xl xl:text-title-11xl">
            Proof of State
            <br />
            <span className="text-teal-500">UseWallet Demo</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl py-16 sm:py-20 px-6 lg:px-8 xl:py-24">
        <div className="flex items-center justify-center">
          <SendTransaction />
        </div>
      </div>
    </main>
  )
}
