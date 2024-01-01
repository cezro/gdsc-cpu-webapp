import React, { Fragment, useEffect } from 'react';
import Layout from '../../components/Layout';

//components

import InputMerch from '@/components/InputMerch';
import ListMerch from '@/components/ListMerch';

export default function AdminMerch() {
  return (
    <Layout>
      <div className="container">
        <InputMerch />
        <ListMerch />
      </div>
    </Layout>
  );
}

/*
export default function AdminMerch() {
  useEffect(() => {
    fetch('http://localhost:3001/admin/admin-merch')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <Layout>
      <h1 className="text-stone-900">Edit Merch</h1>
      <div className="my-6">
        <h1 className="text-black text-3xl underline underline-offset-4">
          Create GDSC merch
        </h1>
      </div>
      <div className="flex flex-col space-y-8">
        <div>
          <p className="text-black text-lg font-semibold mb-1">Merch Name</p>
          <input
            className="text-black h-8 w-64 border border-stone-900"
            placeholder="Name"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">
            Merch Description
          </p>
          <textarea
            className="text-black h-24 w-1/2 border border-stone-900"
            placeholder="Description"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">Merch Photo</p>
          <input
            type="file"
            className="text-black"
            accept="image/png, image/jpeg"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">Merch Price</p>
          <input
            className="text-black h-8 w-64 border border-stone-900"
            placeholder="Price"
          />
        </div>
        <div>
          <button className="h-10 w-40 bg-blue-600 border rounded-md hover:bg-blue-800">
            Publish Merch
          </button>
        </div>
      </div>
    </Layout>
  );
}
*/


