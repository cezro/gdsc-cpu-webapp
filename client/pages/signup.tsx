import React from 'react';
import Image from 'next/image';

function SignUp() {
  return (
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
          <div className="text-xs">GDSC-CPU</div>
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

        <div className="text-white ">
          <p className="text-lg font-bold">CREATE ACCOUNT</p>
        </div>
        <div className="w-full pt-6 relative z-10">
          <div className="mb-2 flex items-center justify-center">
            <div className="w-1/2 pr-1">
              <label className="text-gray-300 text-xs pl-2" htmlFor="firstName">
                First Name
              </label>
              <input
                style={{ background: 'transparent' }}
                className="w-full p-2 text-xs border rounded-lg"
                type="text"
                id="firstName"
              />
            </div>
            <div className="w-1/2 pl-1">
              <label className="text-gray-300 text-xs pl-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                style={{ background: 'transparent' }}
                className="w-full p-2 text-xs border rounded-lg"
                type="text"
                id="lastName"
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
  );
}

export default SignUp;
