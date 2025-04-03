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
  deletedProducts: Array<{ product: Product; originalIndex: number }>;
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
      deletedProducts: [],
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
          const index = state.products.findIndex((p) => p.id === id);
          if (index === -1) return state;

          const productToDelete = state.products[index];
          return {
            products: state.products.filter((p) => p.id !== id),
            deletedProducts: [
              ...state.deletedProducts,
              { product: productToDelete, originalIndex: index },
            ],
          };
        });
      },

      restoreProduct: (id: number) => {
        set((state) => {
          const deletedEntry = state.deletedProducts.find(
            (entry) => entry.product?.id === id
          );

          if (!deletedEntry) return state; // Ensure deletedEntry exists

          const newProducts = [...state.products];
          newProducts.splice(
            deletedEntry.originalIndex,
            0,
            deletedEntry.product
          );

          return {
            products: newProducts,
            deletedProducts: state.deletedProducts.filter(
              (entry) => entry.product?.id !== id
            ),
          };
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
