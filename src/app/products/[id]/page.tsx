'use client';

import Image from 'next/image';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProductStore } from '@/stores/product-store';
import Link from 'next/link';
import React from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { products } = useProductStore();
  const params = useParams();
  const product = products.find((product) => product.id === Number(params.id));

  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Button asChild variant={'secondary'}>
        <Link href="/products">
          <ArrowLeft />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square md:sticky md:top-24">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain rounded-lg border bg-white p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col gap-4">
          <Badge variant="outline">{product.category}</Badge>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <Button>
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
