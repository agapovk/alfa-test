'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useProductStore } from '@/stores/product-store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useCallback } from 'react';

const formSchema = z.object({
  title: z.string().min(1),
  price: z.coerce.number(),
  description: z.string().min(1),
  category: z.string(),
});

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

export default function CreateProductForm() {
  const { createProduct } = useProductStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      try {
        console.log(values);
        createProduct(values);
        toast.success('Product has been created');
        router.push('/products');
      } catch (error) {
        console.error('Form submission error', error);
        toast.error('Failed to submit the form. Please try again.');
      }
    },
    [createProduct, router]
  );

  return (
    <div className="space-y-6">
      <Button asChild variant={'secondary'}>
        <Link href="/products">
          <ArrowLeft />
          Back to Products
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">Create new product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="$" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose catagory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Image will load automatically
          </p>
          <div className="relative aspect-video md:sticky md:top-24">
            <Image
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt="The backpack image"
              fill
              className="object-contain rounded-lg border bg-white p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
