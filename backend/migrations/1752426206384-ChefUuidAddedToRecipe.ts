import { MigrationInterface, QueryRunner } from "typeorm";

export class ChefUuidAddedToRecipe1752426206384 implements MigrationInterface {
  name = "ChefUuidAddedToRecipe1752426206384";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" DROP CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" ALTER COLUMN "chef_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" ADD CONSTRAINT "UQ_chef_recipe" UNIQUE ("chef_uuid", "name")`
    );
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15" FOREIGN KEY ("chef_uuid") REFERENCES "chef"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" DROP CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" DROP CONSTRAINT "UQ_chef_recipe"`
    );
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" ALTER COLUMN "chef_uuid" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."recipe" ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15" FOREIGN KEY ("chef_uuid") REFERENCES "chef"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
