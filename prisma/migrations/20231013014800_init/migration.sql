-- CreateTable
CREATE TABLE "date" (
    "id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "role" TEXT,
    "hrs" TIME(6),
    "shift" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waiter" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "checkTip" DOUBLE PRECISION NOT NULL,
    "paidTip" DOUBLE PRECISION NOT NULL,
    "date_id" INTEGER NOT NULL,

    CONSTRAINT "waiter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "date" ADD CONSTRAINT "date_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "waiter" ADD CONSTRAINT "waiter_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "date"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
