import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UnprocessableEntityException,
  Res,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuditService } from 'src/audit/audit.service';
import { TransactionEntity } from '../database/entities/transaction.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    // @TODO implement SNS notification to notify other clients when transaction is created
    return this.transactionService.create(createTransactionDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'application/json' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    // @todo: store the uploaded file to s3
    try {
      const payload = JSON.parse(file.buffer.toString());
      await this.transactionService.createMany(payload);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  @Get()
  async findMany(@Query('txnId') transactionIds: string[] = []) {
    return this.transactionService.findManyById(transactionIds);
  }

  @Get('/download')
  async download(
    @Query('txnId') transactionIds: string[] = [],
    @Res() res: Response,
  ) {
    const transactions = await this.transactionService.findManyById(
      transactionIds,
    );
    const fileContents = JSON.stringify(transactions, null, 2);
    const buffer = Buffer.from(fileContents);

    res.contentType('json');
    res.attachment(['transactions-' + Date.now(), 'json'].join('.'));
    res.send(buffer);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    // @TODO implement SNS notification to notify other clients when transaction is updated
    await this.transactionService.update(id, updateTransactionDto);
    return this.transactionService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // @TODO implement SNS notification to notify other clients when transaction is deleted
    return this.transactionService.remove(id);
  }

  @Post('sync/:timestamp')
  async synchronize(@Param('timestamp', ParseIntPipe) timestamp: number) {
    const audits = await this.auditService.getEntityAudits(
      TransactionEntity.name,
      timestamp,
    );
    return audits;
  }
}
