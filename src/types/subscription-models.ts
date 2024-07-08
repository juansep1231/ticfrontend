export interface Subscriber {
  id?: number;
  date: string;
  name: string;
  faculty: string;
  career: string;
  email: string;
  plan: string;
  price: string;
}

export interface SubscriptionPlan {
  id?: number;
  planName: string;
  price: number;
  benefits: string;
  academicPeriod: string;
}
