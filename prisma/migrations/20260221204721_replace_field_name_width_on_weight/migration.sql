/*
  Warnings:

  - You are about to drop the column `wight` on the `Exercise_time` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise_time" DROP COLUMN "wight",
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;
