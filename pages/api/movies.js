
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req, res)=>{
    const data = req.body

    const createdMovie = await prisma.Movie.create(data)

    res.json(createdMovie)
}

