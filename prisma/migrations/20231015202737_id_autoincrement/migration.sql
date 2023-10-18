-- AlterTable
CREATE SEQUENCE date_id_seq;
ALTER TABLE "date" ALTER COLUMN "id" SET DEFAULT nextval('date_id_seq');
ALTER SEQUENCE date_id_seq OWNED BY "date"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "user"."id";

-- AlterTable
CREATE SEQUENCE waiter_id_seq;
ALTER TABLE "waiter" ALTER COLUMN "id" SET DEFAULT nextval('waiter_id_seq');
ALTER SEQUENCE waiter_id_seq OWNED BY "waiter"."id";
