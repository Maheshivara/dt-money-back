import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response } from 'express';
import { isUUID } from 'class-validator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
  ) {
    const createdTransaction =
      await this.transactionService.create(createTransactionDto);
    res.status(201).send(createdTransaction);
    return;
  }

  @Get()
  async findAll(@Res() res: Response) {
    const transactions = await this.transactionService.findAll();
    res.status(200).send(transactions);
    return;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(404).send({
        message: 'transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }

    const transaction = await this.transactionService.findOne(id);
    if (!transaction) {
      res.status(404).send({
        message: 'transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    res.status(200).send(transaction);
    return;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(404).send({
        message: 'transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }

    const updatedTransaction = await this.transactionService.update(
      id,
      updateTransactionDto,
    );

    if (!updatedTransaction) {
      res.status(404).send({
        message: 'transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }

    res.status(200).send(updatedTransaction);
    return;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(404).send({
        message: 'transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }

    const transactionExists = await this.transactionService.remove(id);
    if (!transactionExists) {
      res.status(404).send({
        message: 'transaction not found',
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }

    res.sendStatus(204);
    return;
  }
}
