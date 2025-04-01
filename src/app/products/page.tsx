import ProductList from '@/components/product-list';

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl">Products page</h1>
        <p className="text-muted-foreground">The list of products</p>
      </div>
      <ProductList />
    </div>
  );
}
