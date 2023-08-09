/*
  Warnings:

  - Made the column `platform` on table `Click` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Click" ALTER COLUMN "platform" SET NOT NULL,
ALTER COLUMN "platform" SET DEFAULT 'Unknown';
