import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single user by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a user by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
        phone: body.phone,
        birthday: body.birthday ? new Date(body.birthday) : undefined,
        address: body.address,
        city: body.city,
        holyname: body.holyname,
        fathername: body.fathername,
        mothername: body.mothername,
        baptismplace: body.baptismplace,
        baptismdate: body.baptismdate,
        role: body.role,
        role_id: body.role_id,
        isActive: body.isActive,
        lastlogin: body.lastlogin ? new Date(body.lastlogin) : undefined,
      },
    });
    return NextResponse.json(
      { user: updatedUser, message: "User updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a user by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
