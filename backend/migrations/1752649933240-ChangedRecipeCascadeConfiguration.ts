import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class ChangedRecipeCascadeConfiguration1752649933240
  implements MigrationInterface
{
  name = "ChangedRecipeCascadeConfiguration1752649933240";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"
         FOREIGN KEY ("chef_uuid")
         REFERENCES "${DB_SCHEMA}"."chef"("uuid")
         ON DELETE NO ACTION
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
         ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"
         FOREIGN KEY ("chef_uuid")
         REFERENCES "${DB_SCHEMA}"."chef"("uuid")
         ON DELETE CASCADE
         ON UPDATE NO ACTION`
    );
  }
}
