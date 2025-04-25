-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "rolename" TEXT NOT NULL,
    "description" DOUBLE PRECISION NOT NULL,
    "isactive" BOOLEAN NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);
