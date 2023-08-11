import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  PROVIDER_ID,
  WalletProvider,
  useInitializeProviders
} from '@txnlab/use-wallet'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

const queryClient = new QueryClient()

const getDynamicDeflyWalletConnect = async () => {
  const DeflyWalletConnect = (await import('@blockshake/defly-connect'))
    .DeflyWalletConnect
  return DeflyWalletConnect
}

const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import('@perawallet/connect'))
    .PeraWalletConnect
  return PeraWalletConnect
}

const getDynamicDaffiWalletConnect = async () => {
  const DaffiWalletConnect = (await import('@daffiwallet/connect'))
    .DaffiWalletConnect
  return DaffiWalletConnect
}

const getDynamicWalletConnectModalSign = async () => {
  const WalletConnectModalSign = (
    await import('@walletconnect/modal-sign-html')
  ).WalletConnectModalSign
  return WalletConnectModalSign
}

export default function App({ Component, pageProps }: AppProps) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, getDynamicClient: getDynamicDeflyWalletConnect },
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, getDynamicClient: getDynamicDaffiWalletConnect },
      {
        id: PROVIDER_ID.WALLETCONNECT,
        getDynamicClient: getDynamicWalletConnectModalSign,
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
