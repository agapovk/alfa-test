import Link from 'next/link';

export default function Header() {
  const menu = [
    {
      title: 'Products',
      href: '/products',
    },
    {
      title: 'Create Product',
      href: '/products/create',
    },
  ];

  return (
    <header className="border-b p-4 flex gap-4 justify-between">
      <Link href="/" className="font-bold text-xl hover:text-muted-foreground">
        Test:title
      </Link>
      <nav className="space-x-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-muted-foreground text-sm"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
