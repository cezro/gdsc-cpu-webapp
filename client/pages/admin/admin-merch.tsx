import React from 'react';
import Layout from '../../components/Layout';

export default function AdminMerch() {
  return (
    <Layout>
      <h1 className="text-black text-3xl mb-6">Create GDSC merch</h1>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-black text-md font-semibold">Merch Name</p>
          <input className='text-black w-64 border border-stone-900' placeholder='Name'/>
        </div>
        <div>
          <p className="text-black text-md font-semibold">Merch Photo</p>
          <input type='file' className='text-black'/>
        </div>
        <div>
          <p className="text-black text-md font-semibold">Add a price to your merch</p>
          <input className='text-black w-64 border border-stone-900' placeholder='Price'/>
        </div>
        <div>
          <button className='h-12 w-36 bg-blue-600 border rounded-xl hover:bg-blue-800'>Publish Merch</button>
        </div>
      </div>
    </Layout>
  );
}
