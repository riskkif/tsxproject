import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
    data.append('nama', formData.nama);
    data.append('email', formData.email);
    data.append('password', formData.password);


    try {
      const response = await fetch('https://stag-be.bisa.ai/api/app-admin/create-admin', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        navigate('/loginadmin');
          Toast.fire({
            icon: "success",
            title: "Silahkan Login!"
          });
      } else {
        Toast.fire({
          icon: "error",
          title: "Pendaftaran Akun Tidak Berhasil!"
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Pendaftaran Akun Tidak Berhasil!"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className='page max-w-md w-full p-4'>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Daftar Akun</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px py-4">
            <div className="pt-4">  
              <label htmlFor="nama"  className="font-medium text-gray-700">
                Nama
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                autoComplete="nama"
                value={formData.nama} onChange={handleChange} required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="pt-4">
              <label htmlFor="email-address" className="font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email} onChange={handleChange} required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="pt-4">
              <label htmlFor="password"  className="font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password} onChange={handleChange} required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="* * * * * * * *"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <p className="mt-2 text-sm text-gray-600 text-center">Sudah punya akun? <Link to="/loginadmin" className='text-indigo-600 font-medium'>Login</Link></p>
            <p></p>
          </div>
        </form>
      </div>
      </div>
    </div>

    // <div>
    //   <h2>Halaman Registrasi</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Nama:</label>
    //       <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label>Email:</label>
    //       <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input type="password" name="password" value={formData.password} onChange={handleChange} required />
    //     </div>
    //     <button type="submit">Daftar</button>
    //   </form>
    //   {responseMessage && <p>{responseMessage}</p>}
    // </div>
  );
};

export default RegisterAdmin;
