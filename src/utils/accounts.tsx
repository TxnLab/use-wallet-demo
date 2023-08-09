import Big from 'big.js'

export const truncateAddress = (address: string, jsx = false) => {
  if (jsx) {
    return (
      <>
        {address.slice(0, 6)}
        &hellip;
        {address.slice(-4)}
      </>
    )
  }
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export type RoundingMode =
  | 'roundDown'
  | 'roundUp'
  | 'roundHalfUp'
  | 'roundHalfEven'

export const convertFromBaseUnits = (
  amount: number,
  decimals = 0,
  rm: RoundingMode = 'roundDown'
) => {
  if (decimals === 0) return amount
  const divisor = new Big(10).pow(decimals)
  const baseUnits = new Big(amount).round(decimals, Big[rm])
  return baseUnits.div(divisor).toNumber()
}

export const convertToBaseUnits = (
  amount: number,
  decimals = 0,
  rm: RoundingMode = 'roundDown'
) => {
  if (decimals === 0) return amount
  const multiplier = new Big(10).pow(decimals)
  const wholeUnits = new Big(amount).round(decimals, Big[rm])
  return wholeUnits.times(multiplier).toNumber()
}

export const formatWithPrecision = (num: number, precision: number) => {
  let scaledNum = num
  let suffix = ''
  if (num >= 1e12) {
    suffix = 'T'
    scaledNum = num / 1e12
  } else if (num >= 1e9) {
    suffix = 'B'
    scaledNum = num / 1e9
  } else if (num >= 1e6) {
    suffix = 'M'
    scaledNum = num / 1e6
  } else if (num >= 1e3) {
    suffix = 'K'
    scaledNum = num / 1e3
  }
  return scaledNum.toFixed(precision) + suffix
}

export const formatBalance = (
  amount: number,
  decimals: number,
  baseUnits = false,
  trim = true,
  maxLength?: number
) => {
  const formatted = baseUnits
    ? convertFromBaseUnits(amount, decimals).toFixed(decimals)
    : new Big(amount).toFixed(decimals)

  const parts = formatted.split('.')

  if (trim && parts.length === 2) {
    parts[1] = parts[1].replace(/\.?0+$/, '')
  }

  if (maxLength && parts.join('.').length > maxLength) {
    return formatWithPrecision(parseFloat(formatted), 1)
  }

  // Format number with commas, but don't affect decimal places
  parts[0] = new Intl.NumberFormat().format(parseFloat(parts[0]))

  if (parts[1] === '') {
    return parts[0]
  }

  return parts.join('.')
}

export const getIPFSUrl = (url: string) => {
  if (url.startsWith('https://images.nf.domains/ipfs/')) {
    return url.replace(
      'https://images.nf.domains/ipfs/',
      'https://ipfs.algonode.xyz/ipfs/'
    )
  }

  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.algonode.xyz/ipfs/')
  }

  return url
}
