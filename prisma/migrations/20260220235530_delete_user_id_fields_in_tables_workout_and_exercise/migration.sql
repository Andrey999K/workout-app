/*
  Warnings:

  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "userId";
