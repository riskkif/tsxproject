import { FormEvent, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import 'animate.css';


interface Data {
  id: number;
  nama: string;
  nim: string;
  phone: string;
  alamat: string;
  dosen_satu: string;
  dosen_dua: string;
}

interface AddMahasiswaProps {
  userData: Data[];
  setUserData: React.Dispatch<React.SetStateAction<Data[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMahasiswa: React.FC<AddMahasiswaProps> = ({ userData, setUserData, setModalOpen }) => {
  const [newUser, setNewUser] = useState<Omit<Data, 'id'>>({ nama: '', nim: '', phone: '', alamat: '',dosen_satu: '', dosen_dua: ''  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
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
    data.append('nim', newUser.nim);
    data.append('phone', newUser.phone);
    data.append('alamat', newUser.alamat);
    data.append('dosen_satu', newUser.dosen_satu);
    data.append('dosen_dua', newUser.dosen_dua);
  
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch('https://stag-be.bisa.ai/api/app-admin/mahasiswa/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data
      });
  
      if (response.ok) {
        const newUserData = await response.json();
        setUserData([...userData, newUserData.data]); // Adjust based on the structure of your response
        setNewUser({ nama: '', nim: '', phone: '', alamat: '',dosen_satu: '', dosen_dua: '' });
        setModalOpen(false);
        Toast.fire({
          icon: "success",
          title: "Mahasiswa added successfully!"
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

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="p-6 bg-indigo-100">
            <div className="bg-cover bg-center h-24 p-4" style={{ backgroundImage: "url('images/login2.jpg')" }}>
              <div className="flex justify-center">
                <img className="h-16 w-16 rounded-full border-2 border-white -mt-8" src="https://via.placeholder.com/100" alt="Profile" />
              </div>
            </div>
            <h4>Tambah Mahasiswa Baru</h4>
            {error && <p>Error: {error}</p>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px py-4">
                <div className="pt-4">
                  <label htmlFor="nama" className="font-medium text-gray-700">Nama Lengkap</label>
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
                  <label htmlFor="nim" className="font-medium text-gray-700">nim</label>
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    value={newUser.nim}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="nim"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="phone" className="font-medium text-gray-700">No Telepon</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={newUser.phone}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="No Telepon"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="alamat" className="font-medium text-gray-700">Alamat</label>
                  <input
                    id="alamat"
                    name="alamat"
                    type="text"
                    value={newUser.alamat}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Alamat"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="dosen_satu" className="font-medium text-gray-700">dosen_satu</label>
                  <input
                    id="dosen_satu"
                    name="dosen_satu"
                    type="text"
                    value={newUser.dosen_satu}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="dosen_satu"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="dosen_dua" className="font-medium text-gray-700">dosen_dua</label>
                  <input
                    id="dosen_dua"
                    name="dosen_dua"
                    type="text"
                    value={newUser.dosen_dua}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="dosen_dua"
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

export default AddMahasiswa;
