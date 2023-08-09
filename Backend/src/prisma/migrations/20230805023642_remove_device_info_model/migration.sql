/*
  Warnings:

  - You are about to drop the column `device_id` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the `DeviceInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `browser` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformVerion` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_device_id_fkey";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "device_id",
DROP COLUMN "user_agent",
ADD COLUMN     "browser" TEXT NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "platformVerion" TEXT NOT NULL;

-- DropTable
DROP TABLE "DeviceInfo";
