// GET all students, POST new student
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const students = await prisma.student.findMany()
  return Response.json(students)
}

export async function POST(req: Request) {
  const body = await req.json()
  const newStudent = await prisma.student.create({
    data: {
      name: body.name,
      class: body.class,
    },
  })
  return Response.json(newStudent)
}