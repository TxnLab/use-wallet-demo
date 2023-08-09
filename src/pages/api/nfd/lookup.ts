import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { matchesResponseStatus } from '@/utils/api'
import type { NfdLookupResponse } from '@/types/nfd'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' })
    }

    if (typeof address !== 'string') {
      return res.status(400).json({ error: 'Only one address is allowed' })
    }

    try {
      const { data } = await axios<NfdLookupResponse>({
        url: `https://api.nf.domains/nfd/lookup?address=${address}&view=thumbnail`,
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })

      const match = data[address]

      if (!match) {
        return res.status(404).json({ error: 'NFD account not found' })
      }

      return res.status(200).json(match)
    } catch (error) {
      if (matchesResponseStatus(error, [403, 404])) {
        res.status(404).json({ message: 'Matching NFD account not found' })
      } else {
        const errorMessage = (error as { message: string }).message
        console.error('Error performing reverse lookup:', errorMessage)

        res.status(500).json({
          message: 'Error performing reverse lookup',
          details: errorMessage
        })
      }
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler
