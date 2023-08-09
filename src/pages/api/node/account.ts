import algodClient from '@/lib/algodClient'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { address, exclude } = req.query

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' })
    }

    if (typeof address !== 'string') {
      return res.status(400).json({ error: 'Only one address is allowed' })
    }

    try {
      const accountInfo =
        typeof exclude === 'string'
          ? await algodClient.accountInformation(address).exclude(exclude).do()
          : await algodClient.accountInformation(address).do()

      return res.status(200).json(accountInfo)
    } catch (error) {
      console.error('Error fetching account information:', error)
      return res
        .status(500)
        .json({ error: 'Failed to fetch account information' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler
