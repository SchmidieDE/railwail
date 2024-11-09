import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Hole alle APIs, sortiert nach Aufrufen (absteigend)
    const views = await prisma.apiViews.findMany({
      orderBy: {
        count: 'desc'  // 'desc' für absteigend (meist besuchte zuerst)
      }
    })
    return res.json(views)
  }
  
  if (req.method === 'POST') {
    const { apiId, apiName } = req.body
    
    // Erhöhe den Zähler für die spezifische API
    const updated = await prisma.apiViews.upsert({
      where: { apiId },
      update: { 
        count: { increment: 1 }
      },
      create: {
        apiId,
        apiName,
        count: 1
      }
    })
    return res.json(updated)
  }
} 