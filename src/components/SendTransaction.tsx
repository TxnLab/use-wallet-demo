import algosdk from 'algosdk'
import { useState } from 'react'
import algodClient from '@/lib/algodClient'

type Status = 'idle' | 'signing' | 'sending' | 'success' | 'error'

export default function SendTransaction() {
  const [status, setStatus] = useState<Status>('idle')

  // useWallet hook

  const sendTransaction = async () => {
    try {
      // Check for active address

      // Set sender and receiver to active address
      const from = ''
      const to = ''

      const amount = 0

      const suggestedParams = await algodClient.getTransactionParams().do()

      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount,
        suggestedParams
      })

      const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)

      setStatus('signing')

      // Sign transactions

      setStatus('sending')

      // Send transactions

      // Log transaction id

      setStatus('success')

      setTimeout(() => setStatus('idle'), 10000)
    } catch (error) {
      console.error(error)

      setStatus('error')

      setTimeout(() => setStatus('idle'), 10000)
    }
  }

  const renderStatus = () => {
    switch (status) {
      case 'idle':
        return ''
      case 'signing':
        return 'Signing transaction...'
      case 'sending':
        return 'Sending transaction...'
      case 'success':
        return 'Transaction sent!'
      case 'error':
        return 'Transaction failed'
    }
  }

  // Check for active address
  if (true) {
    return null
  }

  return (
    <div className="flex flex-col items-center w-full gap-y-16">
      <div>
        <button
          type="button"
          className="rounded-full bg-teal-600/90 px-6 py-2 font-beni text-white text-4xl tracking-wide shadow-lg shadow-zinc-800/5 ring-1 ring-teal-500/75 backdrop-blur transition hover:bg-teal-600 hover:text-white hover:ring-teal-300 sm:text-5xl sm:px-7 sm:py-2.5 xl:text-6xl xl:px-9 xl:py-3 disabled:opacity-50 disabled:pointer-events-none"
          onClick={sendTransaction}
          disabled={status !== 'idle'}
        >
          Send Transaction
        </button>
      </div>
      <p className="font-beni text-white/75 text-5xl tracking-wide xs:text-6xl sm:text-7xl">
        {renderStatus()}
      </p>
    </div>
  )
}
