import Swal from "sweetalert2";
import { useState } from "react";

interface Data {
  id: number;
  nama: string;
  nidn: string;
  phone: string;
  alamat: string;
}

interface UpdateDosenProps {
  userData: Data[];
  setUserData: React.Dispatch<React.SetStateAction<Data[]>>;
  setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  fetchData: () => void; // Menambahkan fetchData sebagai prop
}

const UpdateDosen: React.FC<UpdateDosenProps> = ({ userData, setUserData, setModalUpdate, userId, fetchData }) => {
  const [newUpdateUser, setNewUpdateUser] = useState<Omit<Data, 'id'>>({ nama: '', nidn: '', phone: '', alamat: '' });
  const [error, setError] = useState<string | null>(null);

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

  const handleUpdateChange = (e: { target: { name: string; value: string; }; }) => {
    setNewUpdateUser({
      ...newUpdateUser,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (id: number) => {
    try {
      const token = sessionStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('nama', newUpdateUser.nama);
      formData.append('nidn', newUpdateUser.nidn);
      formData.append('phone', newUpdateUser.phone);
      formData.append('alamat', newUpdateUser.alamat);

      const response = await fetch(`https://stag-be.bisa.ai/api/app-admin/dosen/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        fetchData(); // Memanggil fetchData untuk memperbarui data
        Toast.fire({
          icon: "error",
          title: "Perbarui profil gagal!"
        });
        return;
      }

      const result = await response.json();
      if (result.success) {
        const updatedUserData = userData.map((user) =>
          user.id === result.data.id ? result.data : user
        );
        setUserData(updatedUserData);

        setNewUpdateUser({ nama: '', nidn: '', phone: '', alamat: '' });
        Toast.fire({
          icon: "success",
          title: "Perbarui Profil Berhasil!"
        });
        setModalUpdate(false);
      } else {
        Toast.fire({
          icon: "success",
          title: "Perbarui profil Berhasil!"
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Perbarui profil gagal!"
      });
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(userId);
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
            <h4>Update Data Dosen</h4>
            {error && <p>Error: {error}</p>}
            
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px py-4">
                <div className="pt-4">
                  <label htmlFor="nama" className="font-medium text-gray-700">Nama Lengkap</label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={newUpdateUser.nama}
                    onChange={handleUpdateChange}
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
                    value={newUpdateUser.nidn}
                    onChange={handleUpdateChange}
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
                    value={newUpdateUser.phone}
                    onChange={handleUpdateChange}
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
                    value={newUpdateUser.alamat}
                    onChange={handleUpdateChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Alamat"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Perbarui
                </button>
                <button
                  type="button"
                  onClick={() => setModalUpdate(false)}
                  className="group relative w-full flex justify-center py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDosen;

