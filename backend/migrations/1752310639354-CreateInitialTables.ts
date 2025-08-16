import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class CreateInitialTables1752310639354 implements MigrationInterface {
  name = "CreateInitialTables1752310639354";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${DB_SCHEMA}"`);

    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."chef" (
         "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "create_date" TIMESTAMP NOT NULL DEFAULT now(),
         "delete_date" TIMESTAMP,
         "first_name" character varying(20) NOT NULL,
         "last_name" character varying(20) NOT NULL,
         "phone" character(10) NOT NULL,
         "email" text NOT NULL,
         CONSTRAINT "PK_c9b74a4150f9f4150f8c8f23de7" PRIMARY KEY ("uuid")
       )`
    );

    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."ingredient" (
         "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "create_date" TIMESTAMP NOT NULL DEFAULT now(),
         "delete_date" TIMESTAMP,
         "name" character varying(20) NOT NULL,
         CONSTRAINT "PK_d2b6c1f63c9611fb5c142c92df4" PRIMARY KEY ("uuid")
       )`
    );

    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."recipe_ingredient_measurement_unit_enum" AS ENUM('Kg','Mg')`
    );

    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."recipe_ingredient" (
         "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "create_date" TIMESTAMP NOT NULL DEFAULT now(),
         "delete_date" TIMESTAMP,
         "recipe_uuid" uuid NOT NULL,
         "ingredient_uuid" uuid NOT NULL,
         "amount" integer NOT NULL,
         "measurement_unit" "${DB_SCHEMA}"."recipe_ingredient_measurement_unit_enum" NOT NULL,
         CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid")
       )`
    );

    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."recipe" (
         "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "create_date" TIMESTAMP NOT NULL DEFAULT now(),
         "delete_date" TIMESTAMP,
         "name" character varying(20) NOT NULL,
         "steps" text array NOT NULL,
         "chef_uuid" uuid NOT NULL,
         CONSTRAINT "PK_550393ff21c21af9084c2e82d60" PRIMARY KEY ("uuid")
       )`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD CONSTRAINT "FK_recipe_ingredient_recipe"
         FOREIGN KEY ("recipe_uuid")
         REFERENCES "${DB_SCHEMA}"."recipe"("uuid")
         ON DELETE NO ACTION
         ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient"
         ADD CONSTRAINT "FK_recipe_ingredient_ingredient"
         FOREIGN KEY ("ingredient_uuid")
         REFERENCES "${DB_SCHEMA}"."ingredient"("uuid")
         ON DELETE NO ACTION
         ON UPDATE NO ACTION`
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
      `ALTER TABLE "${DB_SCHEMA}"."recipe" DROP CONSTRAINT "FK_recipe_chef"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "FK_recipe_ingredient_ingredient"`
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."recipe_ingredient" DROP CONSTRAINT "FK_recipe_ingredient_recipe"`
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "${DB_SCHEMA}"."recipe"`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "${DB_SCHEMA}"."recipe_ingredient"`
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "${DB_SCHEMA}"."recipe_ingredient_measurement_unit_enum"`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "${DB_SCHEMA}"."ingredient"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${DB_SCHEMA}"."chef"`);

    await queryRunner.query(`DROP SCHEMA IF EXISTS "${DB_SCHEMA}" CASCADE`);
  }
}
