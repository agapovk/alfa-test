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
import { cn } from '@/lib/utils';
import { Product } from '@/stores/product-store';

export interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onToggleFavourite: (id: number) => void;
  onToggleLike: (id: number) => void;
}
function ProductCard({
  product,
  onDelete,
  onToggleFavourite,
  onToggleLike,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg gap-4 py-4 relative">
      <Link
        aria-label="Link to product details page"
        href={`/products/${product.id}`}
        className="absolute inset-0 z-10"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(product.id)}
        className="absolute h-6 w-6 top-2 right-2 z-50 rounded-full bg-white"
      >
        <X />
        <span className="sr-only">Delete</span>
      </Button>
      <CardHeader className="p-0 aspect-video relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          loading="lazy"
          className="object-contain transition-transform hover:scale-105"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="outline" className="px-2 py-1">
            {product.category}
          </Badge>
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
        </div>
        <p className="font-semibold text-lg line-clamp-1 mb-2">
          {product.title}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4">
        <Button>Add to Cart</Button>
        <div className="flex gap-2 items-center">
          <Button
            aria-label="Favourite button"
            name="Favourite button"
            variant="outline"
            onClick={() => onToggleFavourite(product.id)}
            className={cn(
              product.favourite && 'bg-amber-300 hover:bg-amber-100',
              ' z-50'
            )}
          >
            <Star className={cn(product.favourite && 'text-white')} />
          </Button>
          <Button
            aria-label="Like button"
            name="Like button"
            variant="outline"
            onClick={() => onToggleLike(product.id)}
            className={cn(
              product.liked && 'bg-amber-300 hover:bg-amber-100',
              ' z-50'
            )}
          >
            <ThumbsUp className={cn(product.liked && 'text-white')} />
            <span className="sr-only">Like</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default React.memo(ProductCard);
