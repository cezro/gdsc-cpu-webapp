import React, { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import host from '@/utils/host';
import { loginSchema } from '@/schemas/user';
import { z } from 'zod';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let isValid = false;

    try {
      const email = formData['email'];
      const password = formData['password'];

      loginSchema.parse({
        email,
        password,
      });
      isValid = true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation failed:', error.errors);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }

    if (isValid) {
      try {
        const response = await fetch(`${host}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/landing';
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="w-full bg-[#07063d] flex items-center justify-center min-h-screen">
        <div className="w-full lg:w-1/2 p-8 ">
          <div className="justify-center flex items-center">
            <Image
              className="justify-center"
              src={require('../public/gdsc_logo.png')}
              alt="GDSC Logo"
              width={150}
              height={150}
            />
          </div>
          <div className="text-white flex items-center justify-center mb-6 text-xs">
            GDSC-CPU
          </div>
          <div className="w-full">
            <div className="mb-2 ">
              <input
                className="text-black w-full rounded-sm p-2 text-xs"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <input
                className="text-black w-full rounded-sm p-2 text-xs"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button className="h-8 w-full max-lg:z-20 bg-blue-500 hover:bg-blue-600 rounded-sm">
              <text className="text-white justify-center flex items-center text-xs">
                Log In
              </text>
            </button>
          </div>
          <div className="text-white mb-7 ">
            <text className="text-xs">Forgot password?</text>
          </div>
          <div>
            <button
              type="button"
              className="h-8 w-full max-lg:z-20 border-2 border-gray-400 hover:border-gray-200 rounded-sm"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/signup';
              }}
            >
              <text className="text-white justify-center flex items-center text-xs">
                No account yet? Sign Up
              </text>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
