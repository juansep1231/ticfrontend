export interface Transaction {
  id?: number;
  date: string;
  originAccount: string;
  destinationAccount: string;
  value: number;
  transactionType: string;
  description: string;
}
