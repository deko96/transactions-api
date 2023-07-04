import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditEntity } from '../../database/entities/audit.entity';
import { AuditAction } from '../audit.enum';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  async afterInsert(event: InsertEvent<any>) {
    await this.saveEntityAudit(event, AuditAction.CREATE);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await this.saveEntityAudit(event, AuditAction.UPDATE);
  }

  async beforeRemove(event: RemoveEvent<any>) {
    await this.saveEntityAudit(event, AuditAction.DELETE);
  }

  private async saveEntityAudit(
    event: InsertEvent<any> | UpdateEvent<any> | RemoveEvent<any>,
    action: AuditAction,
  ) {
    const { manager, entity, metadata } = event;

    if (metadata.target === AuditEntity) return Promise.resolve();

    await manager
      .createQueryBuilder()
      .insert()
      .into(AuditEntity)
      .values({
        entityId: entity.id,
        entityType: metadata.targetName,
        data: entity,
        action,
      })
      .execute();
  }
}
