import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single role by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const role = await prisma.role.findUnique({
      where: { roleid: id },
    });
    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }
    return NextResponse.json(role);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch role" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a role by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedRole = await prisma.role.update({
      where: { roleid: id },
      data: {
        rolename: body.rolename,
        roledescription: body.description,
      },
    });
    return NextResponse.json(updatedRole);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a role by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedRole = await prisma.role.delete({
      where: { roleid: id },
    });
    return NextResponse.json(deletedRole);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete role" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
