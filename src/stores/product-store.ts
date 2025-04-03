import { fetchProducts } from '@/app/actions';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  liked: boolean;
  favourite: boolean;
};

type ProductStore = {
  products: Product[];
  deletedProducts: Product[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => void;
  createProduct: (product: NewProduct) => void;
  deleteProduct: (id: number) => void;
  restoreProduct: (id: number) => void; // Add this line
  toggleLike: (id: number) => void;
  toggleFavourite: (id: number) => void;
};

type NewProduct = Omit<Product, 'id' | 'liked' | 'favourite' | 'image'>;

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      deletedProducts: [], // Add deletedProducts array
      setProducts: (products) => set({ products }),
      fetchProducts: async () => {
        if (get().products.length === 0) {
          const fetchedProducts = await fetchProducts();
          set({ products: fetchedProducts || [] });
        }
      },
      createProduct: (product: NewProduct) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id: Math.max(0, ...state.products.map((p) => p.id)) + 1,
              liked: false,
              favourite: false,
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            },
          ],
        })),
      deleteProduct: (id: number) => {
        set((state) => {
          const productToDelete = state.products.find((p) => p.id === id);
          return productToDelete
            ? {
                products: state.products.filter((p) => p.id !== id),
                deletedProducts: [...state.deletedProducts, productToDelete],
              }
            : state;
        });
      },
      restoreProduct: (id: number) => {
        set((state) => {
          const productToRestore = state.deletedProducts.find(
            (p) => p.id === id
          );
          return productToRestore
            ? {
                products: [...state.products, productToRestore],
                deletedProducts: state.deletedProducts.filter(
                  (p) => p.id !== id
                ),
              }
            : state;
        });
      },
      toggleLike: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, liked: !product.liked } : product
          ),
        })),
      toggleFavourite: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, favourite: !product.favourite }
              : product
          ),
        })),
    }),
    { name: 'product-storage' }
  )
);
