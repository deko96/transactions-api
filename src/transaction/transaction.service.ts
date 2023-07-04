import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TransactionEntity } from '../database/entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepo.create({
      ...createTransactionDto,
    });

    return this.transactionRepo.save(transaction);
  }

  async createMany(createTransactionsDto: CreateTransactionDto[]) {
    if (!createTransactionsDto.length) return [];
    return this.transactionRepo.insert(createTransactionsDto);
  }

  async findAll() {
    return this.transactionRepo.find();
  }

  async findManyById(transactionIds: string[]) {
    return this.transactionRepo.find({
      where: transactionIds.length && {
        id: In(transactionIds),
      },
    });
  }

  async findOne(id: string) {
    return this.transactionRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);
    return this.transactionRepo.update(
      {
        id,
      },
      {
        ...transaction,
        ...updateTransactionDto,
      },
    );
  }

  async remove(id: string) {
    const transaction = await this.findOne(id);
    return this.transactionRepo.remove(transaction);
  }
}
