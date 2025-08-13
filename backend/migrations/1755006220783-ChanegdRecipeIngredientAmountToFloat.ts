import { MigrationInterface, QueryRunner } from "typeorm";

const DB_SCHEMA = process.env.DB_SCHEMA;

export class ChanegdRecipeIngredientAmountToFloat1755006220783
  implements MigrationInterface
{
  name = "ChanegdRecipeIngredientAmountToFloat1755006220783";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" DROP COLUMN "amount"`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" ADD "amount" double precision NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" DROP COLUMN "amount"`
    );
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_ingredient" ADD "amount" integer NOT NULL`
    );
  }
}
