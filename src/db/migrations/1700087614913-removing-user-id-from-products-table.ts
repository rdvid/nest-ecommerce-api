import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovingUserIdFromProductsTable1700087614913 implements MigrationInterface {
    name = 'RemovingUserIdFromProductsTable1700087614913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "user_id" character varying(100) NOT NULL`);
    }

}
