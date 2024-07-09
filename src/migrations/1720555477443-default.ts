import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720555477443 implements MigrationInterface {
    name = 'Default1720555477443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departments" ("id" SERIAL NOT NULL, "department_name" text NOT NULL, CONSTRAINT "UQ_7772b894808a76fe3ac670f380b" UNIQUE ("department_name"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "barcode" character varying(13) NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "UQ_adfc522baf9d9b19cd7d9461b7e" UNIQUE ("barcode"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_departments_departments" ("productsId" integer NOT NULL, "departmentsId" integer NOT NULL, CONSTRAINT "PK_ac4ce9f0d66406b5ca8f9aa2383" PRIMARY KEY ("productsId", "departmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abb45bc24ecfa199c7878abd63" ON "products_departments_departments" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c384a6a6e653775428c088766d" ON "products_departments_departments" ("departmentsId") `);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" ADD CONSTRAINT "FK_abb45bc24ecfa199c7878abd634" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" ADD CONSTRAINT "FK_c384a6a6e653775428c088766d1" FOREIGN KEY ("departmentsId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_departments_departments" DROP CONSTRAINT "FK_c384a6a6e653775428c088766d1"`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" DROP CONSTRAINT "FK_abb45bc24ecfa199c7878abd634"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c384a6a6e653775428c088766d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abb45bc24ecfa199c7878abd63"`);
        await queryRunner.query(`DROP TABLE "products_departments_departments"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "departments"`);
    }

}
