'use client';

import React from 'react';
import { Star, X, Loader2 } from 'lucide-react'; // Add Loader2 import
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { useProductStore } from '@/stores/product-store';
import { toast } from 'sonner';
import ProductCard from './product-card';
import { debounce } from 'lodash';

export default function ProductList() {
  const {
    products: storeProducts,
    deleteProduct,
    restoreProduct,
    fetchProducts,
    toggleLike,
    toggleFavourite,
  } = useProductStore();

  const [onlyFavourite, setOnlyFavourite] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true); // Add loading state

  React.useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        // For testing purposes, we need to ensure this is properly handled
        await new Promise((resolve) => setTimeout(resolve, 600));
        await fetchProducts();
        // Only update state if component is still mounted
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        if (isMounted) {
          toast.error('Failed to load products');
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [fetchProducts]);

  // Create a memoized debounce function that properly cleans up
  const debouncedUpdate = React.useMemo(() => {
    const debouncedFn = debounce((query: string) => {
      setDebouncedSearchQuery(query);
    }, 300);

    // Return the debounced function
    return debouncedFn;
  }, []);

  // Clean up the debounced function on unmount
  React.useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      debouncedUpdate(query);
    },
    [debouncedUpdate]
  );

  const filteredProducts = React.useMemo(() => {
    const filtered = storeProducts.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    return onlyFavourite ? filtered.filter((p) => p.favourite) : filtered;
  }, [debouncedSearchQuery, storeProducts, onlyFavourite]);

  const handleDelete = React.useCallback(
    (id: number) => {
      const deletedProduct = storeProducts.find((p) => p.id === id);
      if (!deletedProduct) return;

      deleteProduct(id);
      toast.warning('Product deleted', {
        action: {
          label: 'Undo',
          onClick: () => {
            restoreProduct(id);
            toast.success('Product restored');
          },
        },
        duration: 3000,
      });
    },
    [deleteProduct, restoreProduct, storeProducts] // Add storeProducts to dependencies
  );

  const toggleFavouriteFilter = React.useCallback(() => {
    setOnlyFavourite((prev) => !prev);
  }, []);

  const resetSearch = React.useCallback(() => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  }, []);

  const favouriteCount = React.useMemo(() => {
    return storeProducts.filter((p) => p.favourite).length;
  }, [storeProducts]);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input
            placeholder="Find a product..."
            className="w-[200px] sm:w-[250px]"
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
          disabled={favouriteCount === 0}
        >
          <Star />
          <span className="hidden sm:inline">Favourite</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2
              className="h-8 w-8 animate-spin"
              role="status"
              aria-label="Loading"
            />
          </div>
        ) : storeProducts.length === 0 ? (
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
