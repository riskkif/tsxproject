import { FormEvent, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import 'animate.css';

interface Data {
  id: number;
  level: number;
  nama: string;
  email: string;
  password: string;
}

interface AddUserProps {
  userData: Data[];
  setUserData: React.Dispatch<React.SetStateAction<Data[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUser: React.FC<AddUserProps> = ({ userData, setUserData, setModalOpen }) => {
  const [newUser, setNewUser] = useState<Omit<Data, 'id'>>({ nama: '', email: '', level: 2, password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
  
    const data = new FormData();
    data.append('nama', newUser.nama);
    data.append('email', newUser.email);
    data.append('password', newUser.password);
    data.append('level', newUser.level.toString());
  
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('https://stag-be.bisa.ai/api/app-admin/user/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data
      });
  
      if (response.ok) {
        const newUserData = await response.json();
        setUserData([...userData, newUserData.data]); // Adjust based on the structure of your response
        setNewUser({ nama: '', email: '', level: 2, password: '' });
        setModalOpen(false);
        Toast.fire({
          icon: "success",
          title: "Dosen added successfully!"
        });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user');
      Toast.fire({
        icon: "error",
        title: "Pendaftaran Akun Tidak Berhasil!"
      });
    }
  };

  const fetchUsers = async (): Promise<Data[]> => {
    const token = sessionStorage.getItem('access_token');
    const response = await fetch('https://p1l04zmq-5000.asse.devtunnels.ms/api/app-admin/dosens', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const data = jsonResponse.data;
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error('Data is not an array');
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, [setUserData]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto " style={{marginTop: 50}}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="p-6 bg-indigo-100" >
            <h1 className="flex align-center font-bold">Tambah User Baru</h1>
            {error && <p>Error: {error}</p>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px py-4">
                <div className="pt-4">
                  <label htmlFor="nama" className="font-medium text-gray-700">Nama</label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={newUser.nama}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="email"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Tambah
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="group relative w-full flex justify-center py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
