import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const date = new Date(data);
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data: date,
        price,
        type,
      },
    });
    return createdTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      orderBy: {
        data: 'desc',
      },
    });
    return transactions;
  }

  async findOne(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction | false> {
    const transactionExists = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!transactionExists) {
      return false;
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    });
    return updatedTransaction;
  }

  async remove(id: string): Promise<boolean> {
    const transactionExists = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!transactionExists) {
      return false;
    }

    await this.prisma.transaction.delete({
      where: {
        id,
      },
    });
    return true;
  }
}
