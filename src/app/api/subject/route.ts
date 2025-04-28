import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all subject records
export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        classSubjects: true,
        scores: true,
      },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch subject records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new subject record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSubject = await prisma.subject.create({
      data: {
        subjectname: body.subjectname,
        code: body.code,
        description: body.description,
        classSubjects: {
          connect: body.classSubjects.map((classId: string) => ({
            class_id: classId,
          })),
        },
        scores: {
          connect: body.scores.map((scoreId: string) => ({
            score_id: scoreId,
          })),
        },
      },
      include: {
        classSubjects: true,
        scores: true,
      },
    });
    return NextResponse.json(newSubject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create subject record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
