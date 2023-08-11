import { useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from '@/hooks/useWindowSize'

interface PartyTimeProps {
  show: boolean
}

export default function PartyTime({ show }: PartyTimeProps) {
  const [isConfettiActive, setIsConfettiActive] = useState(show)
  const { width, height } = useWindowSize()

  if (!show) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none"
      data-testid="confetti"
    >
      <Confetti
        width={width}
        height={height}
        numberOfPieces={isConfettiActive ? 500 : 0}
        gravity={0.14}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setIsConfettiActive(false)
          confetti?.reset()
        }}
      />
    </div>
  )
}
