'use server';

import { Product } from '@/stores/product-store';

export async function fetchProducts(): Promise<Product[] | undefined> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
