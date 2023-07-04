import { EntityTableName } from 'src/database/database.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({
  name: EntityTableName.TRANSACTIONS,
})
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  senderAddress!: string;

  @Column()
  recipientAddress!: string;

  @Column()
  blockNumber!: number;

  @Column()
  amount!: number;

  @Column()
  transactionFee!: number;

  @Column()
  gasPrice!: number;

  @Column()
  gasLimit!: number;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
