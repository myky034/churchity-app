import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single score by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const score = await prisma.score.findUnique({
      where: { score_id: id },
      include: {
        user: true,
        subject: true,
        semester: true,
        scoreType: true,
      },
    });
    if (!score) {
      return NextResponse.json({ error: "Score not found" }, { status: 404 });
    }
    return NextResponse.json(score);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch score" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update a score by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedScore = await prisma.score.update({
      where: { score_id: id },
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
    return NextResponse.json(updatedScore);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update score" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a score by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedScore = await prisma.score.delete({
      where: { score_id: id },
    });
    return NextResponse.json(deletedScore);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete score" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
