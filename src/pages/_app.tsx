import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { WalletConnectModalSign } from '@walletconnect/modal-sign-html'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  PROVIDER_ID,
  WalletProvider,
  useInitializeProviders
} from '@txnlab/use-wallet'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      {
        id: PROVIDER_ID.WALLETCONNECT,
        clientStatic: WalletConnectModalSign,
        clientOptions: {
          projectId: '74dec24df599bff521ad8c630dfe9f0b',
          metadata: {
            name: 'UseWallet Demo',
            description: 'UseWallet Demo',
            url: 'https://use-wallet-demo.vercel.app/',
            icons: ['https://walletconnect.com/walletconnect-logo.png']
          }
        }
      },
      { id: PROVIDER_ID.EXODUS }
    ],
    nodeConfig: {
      network: 'mainnet',
      nodeServer: 'https://mainnet-api.algonode.cloud',
      nodeToken: '',
      nodePort: '443'
    }
  })

  return (
    <WalletProvider value={providers}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WalletProvider>
  )
}
