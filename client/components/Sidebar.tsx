import React from 'react';
import Link from 'next/link';

function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-48 p-4">
      <nav>
        <ul>
          <li>
            <Link href="/admin/admin-home" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/admin/admin-events" className="hover:text-gray-300">
              Events
            </Link>
          </li>
          <li>
            <Link href="/admin/admin-merch" className="hover:text-gray-300">
              Merch
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
