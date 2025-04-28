import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single transcript by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const transcript = await prisma.transcript.findUnique({
      where: { transcript_id: id },
      include: {
        semester: true,
        user: true,
      },
    });
    if (!transcript) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
    return NextResponse.json(transcript);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch class" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a transcript by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedTranscript = await prisma.transcript.update({
      where: { transcript_id: id },
      data: {
        semester_id: body.semester_id,
        user_id: body.user_id,
        gpa: body.gpa,
        conduct: body.conduct,
        attendance_score: body.attendance_score,
        discipline_score: body.discipline_score,
      },
    });
    return NextResponse.json(updatedTranscript);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update transcript" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a transcript by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    await prisma.transcript.delete({
      where: { transcript_id: id },
    });
    return NextResponse.json({ message: "Transcript deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete transcript" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
