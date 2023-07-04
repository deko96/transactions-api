import { IsEthereumAddress, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsEthereumAddress()
  senderAddress!: string;

  @IsEthereumAddress()
  recipientAddress!: string;

  @IsNumber()
  blockNumber!: number;

  @IsNumber()
  amount!: number;

  @IsNumber()
  transactionFee!: number;

  @IsNumber()
  gasPrice!: number;

  @IsNumber()
  gasLimit!: number;
}
