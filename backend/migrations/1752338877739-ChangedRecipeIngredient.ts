import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class ChangedRecipeIngredient1752338877739
  implements MigrationInterface
{
  name = "ChangedRecipeIngredient1752338877739";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" DROP CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f"`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" DROP COLUMN "uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" ADD "uuid" text NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" ADD CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" DROP CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f"`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" DROP COLUMN "uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" ADD CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")`
    );
  }
}
