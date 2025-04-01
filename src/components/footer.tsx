import React from 'react';

export default function Footer() {
  const today = React.useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="border-t p-4 text-sm text-muted-foreground flex justify-center">
      {today}
    </footer>
  );
}
