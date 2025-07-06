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
        name: body.name,
        email: body.email,
        phone:
          body.phone !== undefined && body.phone !== null
            ? String(body.phone)
            : undefined,
        birthday: body.birthday ? new Date(body.birthday) : undefined,
        address: body.address,
        class: body.class,
        grade: body.grade,
        holyname: body.holyname,
        fathername: body.fathername,
        fatherphone:
          body.fatherphone !== undefined && body.fatherphone !== null
            ? String(body.fatherphone)
            : undefined,
        mothername: body.mothername,
        motherphone:
          body.motherphone !== undefined && body.motherphone !== null
            ? String(body.motherphone)
            : undefined,
        baptismplace: body.baptismplace,
        baptismdate: body.baptismdate ? new Date(body.baptismdate) : undefined,
        role: body.role,
        role_id: body.role_id,
        title: body.title,
        isActive: body.isActive,
        lastlogin: body.lastlogin ? new Date(body.lastlogin) : undefined,
        created_at: body.created_at ? new Date(body.created_at) : undefined,
        updated_at: body.updated_at ? new Date(body.updated_at) : undefined,
        created_by: body.created_by,
        updated_by: body.updated_by,
        firstCommunionDate: body.firstCommunionDate
          ? new Date(body.firstCommunionDate)
          : undefined,
        firstCommunionPlace: body.firstCommunionPlace,
        confirmationDate: body.confirmationDate
          ? new Date(body.confirmationDate)
          : undefined,
        confirmationPlace: body.confirmationPlace,
        professionOfFaithDate: body.professionOfFaithDate
          ? new Date(body.professionOfFaithDate)
          : undefined,
        professionOfFaithPlace: body.professionOfFaithPlace,
        catechistLevel: body.catechistLevel,
        avatar: body.avatar,
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

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        birthday: body.birthday ? new Date(body.birthday) : undefined,
        address: body.address,
        class: body.class,
        grade: body.grade,
        holyname: body.holyname,
        fathername: body.fathername,
        fatherphone: body.fatherphone,
        mothername: body.mothername,
        motherphone: body.motherphone,
        baptismplace: body.baptismplace,
        baptismdate: body.baptismdate ? new Date(body.baptismdate) : undefined,
        role: body.role,
        role_id: body.role_id,
        title: body.title,
        isActive: body.isActive,
        lastlogin: body.lastlogin ? new Date(body.lastlogin) : undefined,
        created_at: body.created_at ? new Date(body.created_at) : undefined,
        updated_at: body.updated_at ? new Date(body.updated_at) : undefined,
        created_by: body.created_by,
        updated_by: body.updated_by,
        firstCommunionDate: body.firstCommunionDate
          ? new Date(body.firstCommunionDate)
          : undefined,
        firstCommunionPlace: body.firstCommunionPlace,
        confirmationDate: body.confirmationDate
          ? new Date(body.confirmationDate)
          : undefined,
        confirmationPlace: body.confirmationPlace,
        professionOfFaithDate: body.professionOfFaithDate
          ? new Date(body.professionOfFaithDate)
          : undefined,
        professionOfFaithPlace: body.professionOfFaithPlace,
        catechistLevel: body.catechistLevel,
        avatar: body.avatar,
      },
    });
    return NextResponse.json(
      { user: newUser, message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      {
        error: "Failed to create user",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
