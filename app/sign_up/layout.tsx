import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

export default Layout;
