import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single subject by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const subjectData = await prisma.subject.findUnique({
      where: { subject_id: id },
      include: {
        classSubjects: true,
        scores: true,
      },
    });
    if (!subjectData) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }
    return NextResponse.json(subjectData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch subject" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a subject by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedSubject = await prisma.subject.update({
      where: { subject_id: id },
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
    return NextResponse.json(updatedSubject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update subject" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a subject by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedSubject = await prisma.subject.delete({
      where: { subject_id: id },
    });
    return NextResponse.json(deletedSubject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete subject" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
