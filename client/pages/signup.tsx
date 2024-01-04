import React, { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import host from '@/utils/host';

export interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${host}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Update the structure of the form data sent to the server
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);
      window.location.href = '/landing';
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form action="/landing-page" method="post" onSubmit={handleSubmit}>
      <div className="w-full bg-[#07063D] flex flex-col items-center justify-center min-h-screen">
        <div className="top-5 left-1/2">
          <Image
            className="justify-center"
            src="/gdsc_logo.png"
            alt="GDSC Logo"
            width={150}
            height={150}
          />
          <div className="text-white absolute left-1/2 transform -translate-x-1/2 -translate-y-5 z-10 ">
            <p className="text-xs">GDSC-CPU</p>
          </div>
        </div>
        <div
          className="p-6 bg-cover top-10 relative "
          style={{
            backgroundImage: 'url(blur-bg.png)',
            width: '80%',
            maxWidth: '400px',
            borderRadius: '50px',
          }}
        >
          <div className="absolute w-full h-full  opacity-50 rounded-lg"></div>

          <div className="text-white text-center">
            <label className="text-lg font-bold">CREATE ACCOUNT</label>
          </div>
          <div className="w-full pt-6 relative z-10">
            <div className="mb-2 flex items-center justify-center">
              <div className="w-1/2 pr-1">
                <label
                  className="text-gray-300 text-xs pl-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  style={{ background: 'transparent' }}
                  className="w-full p-2 text-xs border rounded-lg"
                  type="text"
                  id="firstName"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 pl-1">
                <label
                  className="text-gray-300 text-xs pl-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  style={{ background: 'transparent' }}
                  className="w-full p-2 text-xs border rounded-lg"
                  type="text"
                  id="lastName"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="text-gray-300 text-xs pl-2" htmlFor="email">
                Email
              </label>
              <input
                style={{ background: 'transparent' }}
                className="w-full p-2 text-xs border rounded-lg"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-300 text-xs pl-2" htmlFor="password">
                Password
              </label>
              <input
                style={{ background: 'transparent' }}
                className="w-full p-2 text-xs border rounded-lg"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 flex items-center justify-center ">
            <button
              className="max-lg:z-20 bg-blue-400 hover:bg-blue-600 p-2 rounded-lg relative z-10"
              style={{ width: '70%', maxWidth: '300px' }}
            >
              <text className="text-white justify-center flex items-center text-xs font-bold">
                Create Account
              </text>
            </button>
          </div>
          <div className="text-white text-center relative z-10">
            <text className="text-xs">
              Already have an account?{' '}
              <a className="hover:underline undeline-offset-4" href="/login">
                LogIn
              </a>
            </text>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
