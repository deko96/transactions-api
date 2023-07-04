import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { EntityTableName } from '../database.enum';
import { AuditAction } from 'src/audit/audit.enum';

export class CreateAuditsTable1688474066308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: EntityTableName.AUDITS,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'entityId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'entityType',
            type: 'varchar',
          },
          {
            name: 'action',
            type: 'enum',
            enumName: 'AuditAction',
            enum: Object.values(AuditAction),
          },
          {
            name: 'data',
            type: 'json',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(EntityTableName.AUDITS);
  }
}
