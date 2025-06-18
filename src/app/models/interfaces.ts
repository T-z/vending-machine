export interface Product {
  id?: string;
  name: string;
  price: number;
  inventory: number;
}

export interface Balance {
  amount: number;
}

export interface CoinOption {
  value: number;
  dtoValue: string;
}
