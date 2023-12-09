import React from 'react';

function SignUp() {
  return (
    <div className="w-full bg-[#07063D] flex items-center justify-center min-h-screen">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20 mt-5 ">
        <img
          className="justify-center"
          src="gdsc_logo.png"
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
                className="w-full rounded-lg p-2 text-xs border rounded-lg"
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
                className="w-full rounded-lg p-2 text-xs border rounded-lg"
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
              className="w-full rounded-lg p-2 text-xs border rounded-lg"
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
              className="w-full rounded-lg p-2 text-xs border rounded-lg"
              type="password"
              id="password"
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-center ">
          <div
            className="max-lg:z-20 bg-[#4285F3] p-2 rounded-lg border-2 border-white relative z-10"
            style={{ width: '70%', maxWidth: '300px' }}
          >
            <text className="text-white justify-center flex items-center text-xs font-bold">
              Create Account
            </text>
          </div>
        </div>
        <div className="text-white text-center relative z-10">
          <span className="border-b">
            <text className="text-xs">
              Already have an account? <a href="/login">LogIn</a>
            </text>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
