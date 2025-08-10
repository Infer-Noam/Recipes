import { MigrationInterface, QueryRunner } from "typeorm";

const DB_SCHEMA = process.env.DB_SCHEMA;

export class AddedTextFieldToRecipeSteps1754812958265
  implements MigrationInterface
{
  name = "AddedTextFieldToRecipeSteps1754812958265";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_step" ADD "text" character varying(20) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_SCHEMA}."recipe_step" DROP COLUMN "text"`
    );
  }
}
