-- AlterTable
ALTER TABLE "User" ADD COLUMN     "catechistLevel" TEXT,
ADD COLUMN     "confirmationDate" TIMESTAMP(3),
ADD COLUMN     "confirmationPlace" TEXT,
ADD COLUMN     "firstCommunionDate" TIMESTAMP(3),
ADD COLUMN     "firstCommunionPlace" TEXT,
ADD COLUMN     "professionOfFaithDate" TIMESTAMP(3),
ADD COLUMN     "professionOfFaithPlace" TEXT;
