-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
