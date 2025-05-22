'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

export default function UserMenu() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ isLoggedIn: boolean; firstName: string; lastName: string; image: string }>({
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    image: 'https://i.pravatar.cc/36?img=3',
  });


  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser({ isLoggedIn: false, firstName: '', lastName: '', image: '' });
    setOpen(false);
    router.push('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const res = await axios.get('/api/profile/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.data.profile) {
          setUser({
            ...res.data.profile,
            isLoggedIn: true
          });
          localStorage.setItem(
            'user',
            JSON.stringify(res.data.profile)
          );
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  // useEffect(() => {
  //   // Simulate fetching logged-in user from localStorage/session
  //   const storedUser = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   console.log("storedUser.image _> ", token)
  //   if (storedUser) {
  //     try {
  //       const parsedUser = JSON.parse(storedUser);
  //       if (parsedUser?.username) {
  //         console.log("parsedUser.image _> ", parsedUser)
  //         setUser({
  //           isLoggedIn:token ? true : false,
  //           name: parsedUser.username,
  //           image: parsedUser.image || 'https://i.pravatar.cc/36?img=3',
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Failed to parse user data:', error);
  //     }
  //   }
  // }, []);

  return (
    <div className="relative md:block">
      {user.isLoggedIn ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-200 transition"
        >
          <Image
            src={user.image || "https://i.pravatar.cc/36?img=3"}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{user.firstName || "User"}</span>
        </button>
      ) : (
        <Link href="/login">
          <button className="rounded-full p-2 hover:bg-gray-200 transition">
            <User size={20} />
          </button>
        </Link>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
          <div className="px-4 py-3 flex items-center gap-3 border-b">
            <Image
              src={user.image}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{user.firstName}</p>
            </div>
          </div>
          <ul className="text-sm">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <User size={16} /> Account
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
