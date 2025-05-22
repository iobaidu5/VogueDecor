'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

const ProfilePage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    image: '', // base64 string
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const res = await axios.get('/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.profile) {
          setForm(res.data.profile);
          localStorage.setItem('user', JSON.stringify(res.data.profile));
          toast.success('Profile loaded successfully!');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.post('/api/profile/update', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-[20px] py-[100px] lg:px-[74px] lg:py-[170px] relative">

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Edit Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="mb-6 w-full rounded-[8px] border border-[#CDCCCC] bg-white px-10 py-8 shadow-sm"
        >
          <div className="flex flex-wrap -mx-[15px]">
            {/* Left column */}
            <div className="w-full px-[15px] lg:w-6/12 flex flex-col gap-6">
              <div>
                <label className="block text-[16px] text-[#7E7E7E]">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="mt-3 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[16px] text-[#7E7E7E]">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="mt-3 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[16px] text-[#7E7E7E]">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-3 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[16px] text-[#7E7E7E]">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-3 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="w-full px-[15px] mt-8 lg:mt-0 lg:w-6/12 flex flex-col gap-6">
              <div>
                <label className="block text-[16px] text-[#7E7E7E] mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-gray-600"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-4 w-28 h-28 rounded-full object-cover border border-gray-300"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`rounded-[3px] bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800 ${
                loading ? 'cursor-not-allowed opacity-60' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border-top-color: #000;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
