'use client';

import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from './ui/input';
import { Product, useProductStore } from '@/stores/product-store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductList() {
  const {
    products: storeProducts,
    deleteProduct,
    fetchProducts,
    toggleLike,
    toggleFavourite,
  } = useProductStore();

  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [onlyFavourite, setOnlyFavourite] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  React.useEffect(() => {
    console.log('searchQuery effect');
    setFilteredProducts(
      storeProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, storeProducts]);

  React.useEffect(() => {
    console.log('setFiltered effect');
    setFilteredProducts(storeProducts);
  }, [storeProducts]);

  function handleDelete(id: number) {
    try {
      deleteProduct(id);
      toast('Product has been deleted');
    } catch (error) {
      console.log(error);
      toast('Something went wrong');
    }
  }

  function handleFavourite() {
    if (onlyFavourite) {
      setFilteredProducts(storeProducts);
      setOnlyFavourite(false);
    } else {
      const filtered = storeProducts.filter((product) => product.favourite);
      setFilteredProducts(filtered);
      setOnlyFavourite(true);
    }
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input
            placeholder="Find a product..."
            className="h-8 w-[150px] lg:w-[250px]"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery('')}
              className="absolute h-6 w-6 top-1/2 -translate-y-1/2 right-2 z-50 rounded-full bg-white"
            >
              <X />
            </Button>
          )}
        </div>
        <Button
          variant={onlyFavourite ? 'default' : 'outline'}
          onClick={handleFavourite}
        >
          <Star />
          <span className="hidden sm:inline">Favourite</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card
            className="overflow-hidden transition-all hover:shadow-lg gap-4 py-4 relative"
            key={product.id}
          >
            <Link
              href={`/products/${product.id}`}
              className="absolute inset-0 z-10"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(product.id)}
              className="absolute h-6 w-6 top-2 right-2 z-50 rounded-full bg-white"
            >
              <X />
            </Button>
            <CardHeader className="p-0 aspect-video relative">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="object-contain transition-transform hover:scale-105"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="outline" className="px-2 py-1">
                  {product.category}
                </Badge>
                <span className="font-bold text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <h3 className="font-semibold text-lg line-clamp-1 mb-2">
                {product.title}
              </h3>
            </CardContent>
            <CardFooter className="flex items-center justify-between px-4">
              <Button>Add to Cart</Button>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  onClick={() => toggleFavourite(product.id)}
                  className={cn(
                    product.favourite && 'bg-amber-300 hover:bg-amber-100',
                    ' z-50'
                  )}
                >
                  <Star className={cn(product.favourite && 'text-white')} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleLike(product.id)}
                  className={cn(
                    product.liked && 'bg-amber-300 hover:bg-amber-100',
                    ' z-50'
                  )}
                >
                  <ThumbsUp className={cn(product.liked && 'text-white')} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
