import { FormEvent, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import 'animate.css';


interface Data {
  id: number;
  nama: string;
  nidn: string;
  phone: string;
  alamat: string;
}

interface AddDosenProps {
  userData: Data[];
  setUserData: React.Dispatch<React.SetStateAction<Data[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent, newUser: Omit<Data, 'id'>) => Promise<void>;
}

const AddDosen: React.FC<AddDosenProps> = ({ userData, setUserData, setModalOpen, handleSubmit }) => {
  const [newUser, setNewUser] = useState<Omit<Data, 'id'>>({ nama: '', nidn: '', phone: '', alamat: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    await handleSubmit(e, newUser);
    setNewUser({ nama: '', nidn: '', phone: '', alamat: '' });
    setModalOpen(false);
  };


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto " style={{marginTop: 50}}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="p-6 bg-indigo-100" >
            <h1 className="flex align-center font-bold">Tambah Dosen Baru</h1>
            {error && <p>Error: {error}</p>}
            <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
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
                  <label htmlFor="nidn" className="font-medium text-gray-700">NIDN</label>
                  <input
                    id="nidn"
                    name="nidn"
                    type="text"
                    value={newUser.nidn}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="NIDN"
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

export default AddDosen;
