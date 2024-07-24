import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    data.append('email', formData.email);
    data.append('password', formData.password);

    try {
      const response = await fetch('https://stag-be.bisa.ai/api/app-user/login', {
        method: 'POST',
        body: data
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(formData);
        sessionStorage.setItem('access_token', result.data.access_token);
        navigate('/dashboarduser');
        Toast.fire({
          icon: "success",
          title: "Login Sukses!"
        });
      } else {

        Toast.fire({
          icon: "error",
          title: "Login Gagal!"
        });
      }
    } catch (error) {
     
      Toast.fire({
        icon: "error",
        title: "Login Gagal!"
      });
    }
  }


  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-indigo-100 ">
      <div className='page max-w-md w-full p-4'>
    <div className="max-w-md w-full space-y-8 ">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login Area</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div className='mb-4'>
            <label htmlFor="email-address" className="font-medium text-gray-700">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email} onChange={handleChange} required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium text-gray-700 mb-8">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-8"
              placeholder="* * * * * * * *"
              value={formData.password} onChange={handleChange}
            />
          </div>
        </div>


        <div >
          <button
            onClick={handleSubmit}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <p className="mt-2 text-sm text-gray-600 text-center">Belum punya akun? <Link to="/register" className='text-indigo-600 font-medium'>Daftar</Link></p>
        </div>
      </form>
    </div>
  </div>
  </div>
//     <div className="container" style={{marginTop: 70}}>
//     <div className="row">
//       <div className="col s12 m6 offset-m3">
//         <div className="card">
//           <div className="card-content">
//             <span className="card-title">Login</span>
//             <form onSubmit={handleSubmit}>
//               <div className="input-field">
//                 <input id="email" type="email" className="validate" value={formData.email} onChange={handleChange} required />
//                 <label htmlFor="email">Email</label>
//               </div>
//               <div className="input-field">
//                 <input id="password" type="password" className="validate" value={formData.password} onChange={handleChange} required  />
//                 <label htmlFor="password">Password</label>
//               </div>
//               <button className="btn waves-effect waves-light" type="submit" name="action">
//                 Login
//                 <i className="material-icons right">send</i>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
    // <div>
    //   <h2>Halaman Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Email:</label>
    //       <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input type="password" name="password" value={formData.password} onChange={handleChange} required />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    //   {responseMessage && <p>{responseMessage}</p>}
    // </div>
  );
};

export default Login
