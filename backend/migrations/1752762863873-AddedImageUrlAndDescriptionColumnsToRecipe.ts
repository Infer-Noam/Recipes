import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class AddedImageUrlAndDescriptionColumnsToRecipe1752762863873
  implements MigrationInterface
{
  name = "AddedImageUrlAndDescriptionColumnsToRecipe1752762863873";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ADD "description" text NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ADD "image_url" text NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP COLUMN "image_url"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP COLUMN "description"`
    );
  }
}
