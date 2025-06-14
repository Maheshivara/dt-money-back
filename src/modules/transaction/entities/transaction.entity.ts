export class Transaction {
  id: string;
  title: string;
  category: string;
  data: Date;
  price: number;
  type: 'INCOME' | 'OUTCOME';
  createdAt: Date;
  updatedAt: Date;
}
