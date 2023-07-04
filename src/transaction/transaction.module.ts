import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../database/entities/transaction.entity';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), AuditModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
