import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Data {
  id: number;
  nama: string;
  email: string;
  password: string;
  level: number;
}

const UserViewPage: React.FC = () => {
  const [userData, setUserData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalResetOpen, setModalResetOpen] = useState<boolean>(false);
  const [passwordOld, setPasswordOld] = useState<string>('');
  const [passwordNew, setPasswordNew] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [newUpdateUser, setNewUpdateUser] = useState<Omit<Data, 'id'>>({ nama: '', email: '', level: 2, password: '' });
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('https://stag-be.bisa.ai/api/app-user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data dosen');
      }

      const result = await response.json();
      setUserData(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('https://stag-be.bisa.ai/api/app-user/profile/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama: newName, email: newEmail }),
      });

      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: "Perbarui profil gagal!"
        });
        return;
      }

      if (userData) {
        const updatedUserData = { ...userData, nama: newName, email: newEmail };
        setUserData(updatedUserData);
      }

      setNewName('');
      setNewEmail('');
      Toast.fire({
        icon: "success",
        title: "Perbarui Profil Berhasil!"
      });
      setModalOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    navigate('/login');
    Toast.fire({
      icon: "success",
      title: "Logout Sukses!"
    });
  };

  const handleResetPassword = async () => {
    if (passwordNew !== passwordConfirm) {
      Toast.fire({
        icon: "error",
        title: "Password Lama tidak cocok!"
      });
      return;
    }

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('https://stag-be.bisa.ai/api/app-user/profile/reset-password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password_old: passwordOld, password_new: passwordNew, password_confirm: passwordConfirm }),
      });

      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: "Perbarui password gagal!"
        });
        return;
      }

      setPasswordOld('');
      setPasswordNew('');
      setPasswordConfirm('');
      Toast.fire({
        icon: "success",
        title: "Perbarui Password Berhasil!"
      });
      setModalResetOpen(false);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Perbarui password gagal!"
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userData && (
        <>
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {/* Icon when menu is closed */}
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    {/* Icon when menu is open */}
                    <svg
                      className="hidden h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {/* Navigation links */}
                      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </div>
                  </div>
                </div>
                <span className='flex justify-end'>
                <button className='text-gray-300 hover:bg-red-300 bg-red-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium' onClick={handleLogout}>Logout</button>
                </span>
              </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className="sm:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
              </div>
            </div>
          </nav>

          <div className="container mx-auto mt-10">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Profil Pengguna</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nama:</label>
                <p>{userData.nama}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <p>{userData.email}</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Profil
              </button>
              <button
                onClick={() => setModalResetOpen(true)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Reset Password
              </button>
            </div>
          </div>

          {/* Modal for updating profile */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Update Profil</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nama Baru:</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email Baru:</label>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for resetting password */}
          {modalResetOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password Lama:</label>
                  <input
                    type="password"
                    value={passwordOld}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordOld(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password Baru:</label>
                  <input
                    type="password"
                    value={passwordNew}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordNew(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Konfirmasi Password:</label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleResetPassword}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setModalResetOpen(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserViewPage;
