import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class ChefEmailAndPhoneBecomeUnique1752425653091
  implements MigrationInterface
{
  name = "ChefEmailAndPhoneBecomeUnique1752425653091";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef" ADD CONSTRAINT "UQ_230c99408dee54a7ba09fe40e46" UNIQUE ("phone")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef" ADD CONSTRAINT "UQ_44862ca93599a784f9f2cf72838" UNIQUE ("email")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP COLUMN "uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ALTER COLUMN "chef_uuid" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "UQ_recipe_ingredient" UNIQUE ("recipe_uuid", "ingredient_uuid")`
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
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "UQ_recipe_ingredient"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ALTER COLUMN "chef_uuid" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe" ADD CONSTRAINT "FK_066b30eedb42e8c59ac15eeac15" FOREIGN KEY ("chef_uuid") REFERENCES "chef"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP COLUMN "uuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD "uuid" text NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" ADD CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef" DROP CONSTRAINT "UQ_44862ca93599a784f9f2cf72838"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."chef" DROP CONSTRAINT "UQ_230c99408dee54a7ba09fe40e46"`
    );
  }
}
