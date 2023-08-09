import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NfdLookupResponse } from '@/types/nfd'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' })
    }

    try {
      const { data } = await axios<NfdLookupResponse>({
        url: `https://api.nf.domains/nfd/lookup?address=${address}&view=thumbnail`,
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })

      const match = data[address as string]

      if (!match) {
        return res.status(404).json({ error: 'NFD account not found' })
      }

      return res.status(200).json(match)
    } catch (error) {
      console.error('Error performing reverse lookup:', error)
      return res.status(500).json({ error: 'NFD reverse lookup failed' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler
