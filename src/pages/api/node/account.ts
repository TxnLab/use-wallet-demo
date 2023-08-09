import algodClient from '@/lib/algodClient'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' })
    }

    try {
      const accountInfo = await algodClient
        .accountInformation(address as string)
        .do()
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
