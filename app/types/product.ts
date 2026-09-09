export interface Product {
  id: number | string;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  rating?: number;
  description?: string;
  category?: string;
  stock?: number;
}
