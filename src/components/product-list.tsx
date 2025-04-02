'use client';

import React from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { useProductStore } from '@/stores/product-store';
import { toast } from 'sonner';
import ProductCard from './product-card';
import { debounce } from 'lodash';

// Move debounce function outside the component
const debouncedUpdate = debounce((query, setDebouncedSearchQuery) => {
  setDebouncedSearchQuery(query);
}, 300);

export default function ProductList() {
  const {
    products: storeProducts,
    deleteProduct,
    fetchProducts,
    toggleLike,
    toggleFavourite,
  } = useProductStore();

  const [onlyFavourite, setOnlyFavourite] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState('');

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update the search query and debounced search query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedUpdate(query, setDebouncedSearchQuery);
  };

  const filteredProducts = React.useMemo(() => {
    const filtered = storeProducts.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    return onlyFavourite ? filtered.filter((p) => p.favourite) : filtered;
  }, [debouncedSearchQuery, storeProducts, onlyFavourite]);

  const handleDelete = React.useCallback(
    (id: number) => {
      try {
        deleteProduct(id);
        toast('Product deleted', {
          style: {
            color: 'white',
            backgroundColor: 'red',
          },
        });
      } catch (error) {
        console.error('Delete product error', error);
        toast('Something went wrong');
      }
    },
    [deleteProduct]
  );

  const toggleFavouriteFilter = React.useCallback(() => {
    setOnlyFavourite((prev) => !prev);
  }, []);

  const resetSearch = React.useCallback(() => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  }, []);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input
            placeholder="Find a product..."
            className="h-8 w-[150px] lg:w-[250px]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={resetSearch}
              className="absolute h-6 w-6 top-1/2 -translate-y-1/2 right-2 z-50 rounded-full bg-white"
            >
              <X />
            </Button>
          )}
        </div>
        <Button
          variant={onlyFavourite ? 'default' : 'outline'}
          onClick={toggleFavouriteFilter}
        >
          <Star />
          <span className="hidden sm:inline">Favourite</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {storeProducts.length === 0 ? (
          <p className="py-4">Please reload the page to fetch new data</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onToggleFavourite={toggleFavourite}
              onToggleLike={toggleLike}
            />
          ))
        )}
      </div>
    </>
  );
}
