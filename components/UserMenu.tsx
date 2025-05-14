'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';

const mockUser = {
  isLoggedIn: false,
  name: 'Obaid Khan',
  image: 'https://i.pravatar.cc/36?img=3',
};

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setOpen(!open);
  const handleLogout = () => {
    // Logout logic here
    alert('Logged out!');
    setOpen(false);
  };

  return (
    <div className="relative hidden md:block">
      {mockUser.isLoggedIn ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200 transition"
        >
          <Image
            src={mockUser.image}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{mockUser.name.split(' ')[0]}</span>
        </button>
      ) : (
        <Link href="/login">
          <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition">
            <User size={20} />
          </button>
        </Link>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
          <div className="px-4 py-3 flex items-center gap-3 border-b">
            <Image
              src={mockUser.image}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{mockUser.name}</p>
            </div>
          </div>
          <ul className="text-sm">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <User size={16} /> Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <Settings size={16} /> Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
