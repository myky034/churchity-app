import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all scores
export async function GET() {
  try {
    const scores = await prisma.score.findMany({
      include: {
        user: true,
        subject: true,
        semester: true,
        scoreType: true,
      },
    });
    return NextResponse.json(scores);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Create a new score
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newScore = await prisma.score.create({
      data: {
        score: body.score,
        user_id: body.user_id,
        subject_id: body.subject_id,
        semester_id: body.semester_id,
        score_type_id: body.score_type_id,
        note: body.note,
      },
      include: {
        user: true,
        subject: true,
        semester: true,
        scoreType: true,
      },
    });
    return NextResponse.json(newScore);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create score" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
