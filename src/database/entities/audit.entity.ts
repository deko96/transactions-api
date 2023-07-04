import { EntityTableName } from 'src/database/database.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditAction } from '../../audit/audit.enum';

@Entity({
  name: EntityTableName.AUDITS,
})
export class AuditEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entityId: string;

  @Column()
  entityType: string;

  @Column()
  action: AuditAction;

  @Column('json')
  data: unknown;

  @CreateDateColumn()
  createdAt: Date;
}
