import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740963230679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO company (companyName, cuit, adhesionDate)
      VALUES
        ('Tech Innovators Inc', '12345678901', '2024-11-01'),
        ('Green Solutions Ltd', '23456789012', '2024-11-02'),
        ('Healthcare Partners LLC', '34567890123', '2024-11-03'),
        ('Finance Experts Co', '45678901234', '2024-11-04'),
        ('Retail Ventures Group', '56789012345', '2024-11-05'),
        ('Logistics & Transport', '67890123456', '2024-11-06'),
        ('Construction Leaders', '78901234567', '2025-02-25'),
        ('Energy Pioneers Corp', '89012345678', '2025-02-28'),
        ('Food & Beverage Holdings', '90123456789', '2025-03-01'),
        ('Media & Entertainment', '01234567890', '2025-03-03');
    `);

    await queryRunner.query(`
      INSERT INTO transfer (amount, debitAccount, creditAccount, companyId)
      SELECT
        FLOOR(RAND() * 100) + 1 AS amount,
        CONCAT('debitAccount', FLOOR(RAND() * 100) + 1) AS debitAccount,
        CONCAT('creditAccount', FLOOR(RAND() * 100) + 1) AS creditAccount,
        FLOOR(RAND() * 10) + 1 AS companyId
      FROM company
      LIMIT 30;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM company`);
  }
}
