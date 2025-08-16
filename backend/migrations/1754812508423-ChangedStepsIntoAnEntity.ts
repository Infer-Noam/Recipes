import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class ChangedStepsIntoAnEntity1754812508423
  implements MigrationInterface
{
  name = "ChangedStepsIntoAnEntity1754812508423";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."recipe_step" (
         "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "create_date" TIMESTAMP NOT NULL DEFAULT now(),
         "delete_date" TIMESTAMP,
         "placement" integer NOT NULL,
         "recipe_uuid" uuid,
         CONSTRAINT "PK_5ad5c1a241041f7abfa22add33b" PRIMARY KEY ("uuid")
       )`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP COLUMN IF EXISTS "steps"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_step"
         ADD CONSTRAINT "FK_fdef8d6a1bf0a4681aa5ad9f1ec"
         FOREIGN KEY ("recipe_uuid")
         REFERENCES "${DB_SCHEMA}"."recipe"("uuid")
         ON DELETE NO ACTION
         ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_step"
         DROP CONSTRAINT IF EXISTS "FK_fdef8d6a1bf0a4681aa5ad9f1ec"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ADD "steps" text array NOT NULL`
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "${DB_SCHEMA}"."recipe_step"`
    );
  }
}
