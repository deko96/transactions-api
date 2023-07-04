import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { EntityTableName } from '../database.enum';

export class CreateTransactionsTable1688471168744
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: EntityTableName.TRANSACTIONS,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'senderAddress',
            type: 'varchar',
          },
          {
            name: 'recipientAddress',
            type: 'varchar',
          },
          {
            name: 'blockNumber',
            type: 'int',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'transactionFee',
            type: 'int',
          },
          {
            name: 'gasPrice',
            type: 'int',
          },
          {
            name: 'gasLimit',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(EntityTableName.TRANSACTIONS);
  }
}
