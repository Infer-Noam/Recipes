import { MigrationInterface, QueryRunner } from "typeorm";

const { DB_SCHEMA } = process.env;

export class CreateInitialTables1752310639354 implements MigrationInterface {
  name = "CreateInitialTables1752310639354";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."chef" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "first_name" character varying(20) NOT NULL, "last_name" character varying(20) NOT NULL, "phone" character(10) NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_c9b74a4150f9f4150f8c8f23de7" PRIMARY KEY ("uuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."ingredient" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "name" character varying(20) NOT NULL, CONSTRAINT "PK_d2b6c1f63c9611fb5c142c92df4" PRIMARY KEY ("uuid"))`
    );
    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."recipe_ingredient_measurement_unit_enum" AS ENUM('Kg', 'Mg')`
    );
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."recipe_ingredient" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "recipe_uuid" uuid NOT NULL, "ingredient_uuid" uuid NOT NULL, "amount" integer NOT NULL, "measurement_unit" "public"."recipe_ingredient_measurement_unit_enum" NOT NULL, CONSTRAINT "PK_42f6e9ced8cca7cd62e05f41f2f" PRIMARY KEY ("uuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."recipe" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "name" character varying(20) NOT NULL, "steps" text array NOT NULL, "chef_uuid" uuid NOT NULL, CONSTRAINT "PK_550393ff21c21af9084c2e82d60" PRIMARY KEY ("uuid"))`
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
    await queryRunner.query(`DROP TABLE "${DB_SCHEMA}"."recipe"`);
    await queryRunner.query(`DROP TABLE "${DB_SCHEMA}"."recipe_ingredient"`);
    await queryRunner.query(
      `DROP TYPE "${DB_SCHEMA}"."recipe_ingredient_measurement_unit_enum"`
    );
    await queryRunner.query(`DROP TABLE "${DB_SCHEMA}"."ingredient"`);
    await queryRunner.query(`DROP TABLE "${DB_SCHEMA}"."chef"`);
  }
}
