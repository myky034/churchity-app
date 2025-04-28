import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all transcript records
export async function GET() {
  try {
    const transcripts = await prisma.transcript.findMany({
      include: {
        semester: true,
        user: true,
      },
    });
    return NextResponse.json(transcripts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch transcript records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new transcript record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTranscript = await prisma.transcript.create({
      data: {
        user_id: body.user_id,
        semester_id: body.semester_id,
        gpa: body.gpa,
        conduct: body.conduct,
        attendance_score: body.attendance_score,
        discipline_score: body.discipline_score,
      },
      include: {
        user: true,
        semester: true,
      },
    });
    return NextResponse.json(newTranscript);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create transcript record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
