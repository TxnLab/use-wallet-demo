import { truncateAddress } from '@/utils'

interface ConnectButtonProps {
  setOpen: (open: boolean) => void
  activeAddress: string | undefined
}

export default function ConnectButton({
  setOpen,
  activeAddress
}: ConnectButtonProps) {
  return (
    <button
      type="button"
      className="group rounded-full bg-zinc-800/90 px-4 py-2.5 sm:px-5 text-sm sm:text-base font-medium text-white/80 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur transition hover:text-white hover:ring-white/20"
      onClick={() => setOpen(true)}
    >
      {activeAddress ? truncateAddress(activeAddress) : 'Connect wallet'}
    </button>
  )
}
