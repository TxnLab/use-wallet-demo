import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import AlgoSymbol from '@/components/AlgoSymbol'
import LoadingDots from '@/components/LoadingDots'
import { formatBalance, getAvatarURL, truncateAddress } from '@/utils'
import type { AccountInfo } from '@/types/node'

interface UserThumbnailProps {
  address: string
}

export default function UserThumbnail({ address }: UserThumbnailProps) {
  const { data: accountInfo } = useQuery<AccountInfo>({
    queryKey: ['account', address],
    queryFn: async () => {
      const response = await fetch(
        `/api/node/account?address=${address}&exclude=all`
      )
      const data = await response.json()

      return data
    },
    enabled: !!address,
    refetchInterval: 10000
  })

  const { data: nfd, isLoading } = useQuery({
    queryKey: ['nfd', address],
    queryFn: async () => {
      const response = await fetch(`/api/nfd/lookup?address=${address}`)
      const data = await response.json()

      return data
    },
    enabled: !!address
  })

  const renderThumbnail = () => {
    if (nfd) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="inline-block h-16 w-16 rounded-full"
          src={getAvatarURL(nfd)}
          alt={nfd.name}
        />
      )
    }

    return (
      <Image
        className="inline-block h-16 w-16 rounded-full opacity-50"
        src="/img/provider-icon.png"
        alt=""
        width={48}
        height={48}
      />
    )
  }

  const renderName = () => {
    if (nfd) {
      return (
        <>
          <span className="relative -top-[1px]">{nfd.name}</span>
          <span
            aria-hidden="true"
            className="block w-px h-5 bg-white/30 mx-2"
          />
          <span className="font-mono text-white/75 text-sm">
            {truncateAddress(address, true)}
          </span>
        </>
      )
    }

    return <span className="font-mono">{truncateAddress(address, true)}</span>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <LoadingDots className="my-0.5" />
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <div className="min-w-[4rem]">{renderThumbnail()}</div>
      <div className="ml-3">
        <p className="flex items-center flex-wrap text-lg font-medium text-white leading-6 group-hover:text-white">
          {renderName()}
        </p>
        {accountInfo?.amount && (
          <p className="text-base font-medium font-mono text-white/75">
            <AlgoSymbol /> {formatBalance(accountInfo.amount, 6, true)}
          </p>
        )}
      </div>
    </div>
  )
}
