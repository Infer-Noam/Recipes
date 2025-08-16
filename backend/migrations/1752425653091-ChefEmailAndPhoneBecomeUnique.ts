import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class ChefEmailAndPhoneBecomeUnique1752425653091
  implements MigrationInterface
{
  name = "ChefEmailAndPhoneBecomeUnique1752425653091";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "FK_recipe_chef"`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef"
         ADD CONSTRAINT "UQ_chef_phone" UNIQUE ("phone")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef"
         ADD CONSTRAINT "UQ_chef_email" UNIQUE ("email")`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         DROP CONSTRAINT IF EXISTS "PK_42f6e9ced8cca7cd62e05f41f2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         DROP COLUMN IF EXISTS "uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ALTER COLUMN "chef_uuid" DROP NOT NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD CONSTRAINT "UQ_recipe_ingredient_pair"
         UNIQUE ("recipe_uuid", "ingredient_uuid")`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ADD CONSTRAINT "FK_recipe_chef"
         FOREIGN KEY ("chef_uuid")
         REFERENCES "${DB_SCHEMA}"."chef"("uuid")
         ON DELETE CASCADE
         ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         DROP CONSTRAINT IF EXISTS "FK_recipe_chef"`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         DROP CONSTRAINT IF EXISTS "UQ_recipe_ingredient_pair"`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe"
         ALTER COLUMN "chef_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         DROP CONSTRAINT IF EXISTS "PK_42f6e9ced8cca7cd62e05f41f2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         DROP COLUMN IF EXISTS "uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD "uuid" text NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef"
         DROP CONSTRAINT IF EXISTS "UQ_chef_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef"
         DROP CONSTRAINT IF EXISTS "UQ_chef_phone"`
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
