import { MigrationInterface, QueryRunner } from "typeorm";

export class LoweredIngredientNameMaxLength1753179954235 implements MigrationInterface {
    name = 'LoweredIngredientNameMaxLength1753179954235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "name" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "name" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE ("name")`);
    }

}
