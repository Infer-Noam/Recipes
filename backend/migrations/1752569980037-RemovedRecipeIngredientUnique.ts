import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class RemovedRecipeIngredientUnique1752569980037
  implements MigrationInterface
{
  name = "RemovedRecipeIngredientUnique1752569980037";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "UQ_recipe_ingredient"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP CONSTRAINT "UQ_chef_recipe"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "FK_4c55a865881520167d86b67e549"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "FK_04dfc797701695aee82d7193e0b"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ALTER COLUMN "recipe_uuid" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ALTER COLUMN "ingredient_uuid" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ALTER COLUMN "chef_uuid" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "FK_4c55a865881520167d86b67e549" FOREIGN KEY ("recipe_uuid") REFERENCES "recipe"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "FK_04dfc797701695aee82d7193e0b" FOREIGN KEY ("ingredient_uuid") REFERENCES "ingredient"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15" FOREIGN KEY ("chef_uuid") REFERENCES "chef"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "FK_04dfc797701695aee82d7193e0b"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "FK_4c55a865881520167d86b67e549"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ALTER COLUMN "chef_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15" FOREIGN KEY ("chef_uuid") REFERENCES "chef"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ALTER COLUMN "ingredient_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ALTER COLUMN "recipe_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "FK_04dfc797701695aee82d7193e0b" FOREIGN KEY ("ingredient_uuid") REFERENCES "ingredient"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "FK_4c55a865881520167d86b67e549" FOREIGN KEY ("recipe_uuid") REFERENCES "recipe"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ADD CONSTRAINT "UQ_chef_recipe" UNIQUE ("name", "chef_uuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "UQ_recipe_ingredient" UNIQUE ("recipe_uuid", "ingredient_uuid")`
    );
  }
}
