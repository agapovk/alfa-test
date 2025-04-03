import ProductList from '@/components/product-list';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <section className="text-center sm:text-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Products page
          </h1>
          <p className="text-muted-foreground">The list of products</p>
        </div>
      </section>
      <ProductList />
    </div>
  );
}
