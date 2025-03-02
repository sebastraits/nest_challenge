import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740842472014 implements MigrationInterface {
  name = 'Migration1740842472014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transfer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`amount\` decimal(10,2) NOT NULL, \`debitAccount\` varchar(100) NOT NULL, \`creditAccount\` varchar(100) NOT NULL, \`companyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`companyName\` varchar(255) NOT NULL, \`cuit\` char(11) NOT NULL, \`adhesionDate\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transfer\` ADD CONSTRAINT \`FK_5c1bee8a0ead9a96cb41b21bcba\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transfer\` DROP FOREIGN KEY \`FK_5c1bee8a0ead9a96cb41b21bcba\``,
    );
    await queryRunner.query(`DROP TABLE \`company\``);
    await queryRunner.query(`DROP TABLE \`transfer\``);
  }
}
