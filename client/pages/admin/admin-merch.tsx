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
        <div className='mt-8'>
          <h1 className="text-black text-3xl underline underline-offset-4">
            Preview & Edit GDSC Merch
          </h1>
        </div>
        <ListMerch />
      </div>
    </Layout>
  );
}
