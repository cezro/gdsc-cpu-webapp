import React from 'react';
import Layout from '../../components/Layout';

//components

import InputMerch from '@/components/InputMerch';
import ListMerch from '@/components/ListMerch';
import PreOrderStats from '@/components/PreOrderStats';

export default function AdminMerch() {
  return (
    <Layout>
      <div className="container">
        <div className="mt-8">
          <h1 className="text-black text-3xl underline underline-offset-4">
            Merch Pre-Order Statistics
          </h1>
        </div>
        <PreOrderStats />
        <InputMerch />
        <div className="mt-8">
          <h1 className="text-black text-3xl underline underline-offset-4">
            Preview & Edit GDSC Merch
          </h1>
        </div>
        <ListMerch />
      </div>
    </Layout>
  );
}
