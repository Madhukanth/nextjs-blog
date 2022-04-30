import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const MONGO_URL = process.env.MONGO_URL

type Query = {
  email: string
  name: string
  message: string
  id?: string
}

type ResponseData = {
  message?: string
  query?: Query
}

interface Request extends NextApiRequest {
  body: {
    email: string
    name: string
    message: string
  }
}

export default async function handler(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Bad Request' })
  }

  const { email, name, message } = req.body
  if (!email || !name || !message) {
    return res.status(422).json({ message: 'Please provide all the fields' })
  }

  if (!MONGO_URL) {
    return res.status(500).json({ message: 'Unable to connect to database' })
  }

  try {
    const query: Query = { email, name, message }
    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db()
    const result = await db.collection('queries').insertOne(query)
    query.id = result.insertedId.toString()
    client.close()
    return res.status(201).json({ message: 'Created Successfully', query })
  } catch (err) {
    return res.status(500).json({ message: 'Unable to connect database' })
  }
}
