import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniques1752421578111 implements MigrationInterface {
  name = "AddedUniques1752421578111";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."ingredient" ADD CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE ("name")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${process.env.DB_SCHEMA}."ingredient" DROP CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f"`
    );
  }
}
