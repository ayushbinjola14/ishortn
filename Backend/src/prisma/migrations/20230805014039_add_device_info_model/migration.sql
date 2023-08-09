/*
  Warnings:

  - Added the required column `device_id` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" ADD COLUMN     "device_id" INTEGER NOT NULL,
ALTER COLUMN "referrer" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;

-- CreateTable
CREATE TABLE "DeviceInfo" (
    "id" SERIAL NOT NULL,
    "browser" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "DeviceInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "DeviceInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
