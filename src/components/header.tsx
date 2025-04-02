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
      <Link href="/" className="text-xl hover:text-muted-foreground">
        <strong>Alfa</strong>Test Project
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-muted-foreground text-sm"
            >
              {item.title}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
