export interface Member {
  id: number;
  name: string;
  position: string;
  semester: string;
  email: string;
  telf: string;
}

export interface Plan {
  id: number;
  title: string;
  price: number;
  benefits: string[];
}
