import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import { AuditEntity } from '../database/entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepo: Repository<AuditEntity>,
  ) {}

  async getEntityAudits(entityType: string, lastSyncTimestamp?: number) {
    const where: FindOptionsWhere<AuditEntity> = {
      entityType,
    };

    if (lastSyncTimestamp) {
      const lastSyncDate = new Date(lastSyncTimestamp);
      where['createdAt'] = MoreThanOrEqual(lastSyncDate);
    }

    return this.auditRepo.find({
      where,
    });
  }
}
