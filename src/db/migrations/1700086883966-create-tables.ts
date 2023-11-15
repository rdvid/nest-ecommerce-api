import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1700086883966 implements MigrationInterface {
    name = 'CreateTables1700086883966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "quantity" TO "available_quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "available_quantity" TO "quantity"`);
    }

}
