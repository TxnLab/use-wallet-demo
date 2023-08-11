import { useQuery } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { shouldRetryQuery } from '@/utils'
import type { NfdRecordThumbnail } from '@/types/nfd'

export default function useNfdLookup(address: string | undefined) {
  return useQuery<NfdRecordThumbnail, AxiosError>({
    queryKey: ['nfd', address],
    queryFn: async () => {
      const { data } = await axios.get(`/api/nfd/lookup?address=${address}`)
      return data
    },
    enabled: !!address,
    retry: (failureCount, error) => {
      if (!shouldRetryQuery(error)) {
        return false
      }
      return failureCount < 3
    },
    refetchOnWindowFocus: false
  })
}
