import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class ChefUuidAddedToRecipe1752426206384 implements MigrationInterface {
  name = "ChefUuidAddedToRecipe1752426206384";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ALTER COLUMN "chef_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ADD CONSTRAINT "UQ_chef_recipe"
         UNIQUE ("chef_uuid","name")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"
         FOREIGN KEY ("chef_uuid")
         REFERENCES "${DB_SCHEMA}"."chef"("uuid")
         ON DELETE CASCADE
         ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "UQ_chef_recipe"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ALTER COLUMN "chef_uuid" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"
         FOREIGN KEY ("chef_uuid")
         REFERENCES "${DB_SCHEMA}"."chef"("uuid")
         ON DELETE CASCADE
         ON UPDATE NO ACTION`
    );
  }
}
