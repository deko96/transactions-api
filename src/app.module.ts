import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
