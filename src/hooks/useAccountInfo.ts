import { useQuery } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import type { AccountInfo } from '@/types/node'

export default function useAccountInfo(address: string | undefined) {
  return useQuery<AccountInfo, AxiosError>({
    queryKey: ['account', address],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/node/account?address=${address}&exclude=all`
      )
      return data
    },
    enabled: !!address,
    refetchInterval: 10000
  })
}
