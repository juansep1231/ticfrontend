export interface EventView {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  budgetStatus: string;
  location: string;
  provider: string;
  status: string;
  income?: number;
}
