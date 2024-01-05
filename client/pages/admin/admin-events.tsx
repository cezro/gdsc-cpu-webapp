import React from 'react';
import Layout from '../../components/Layout';
import ListEvent from '@/components/ListEvent'
import InputEvent from '@/components/InputEvent'

export default function AdminEvents() {

  return (
    <Layout>
          <div className="container">
        <InputEvent />
        <div className="mt-8">
          <h1 className="text-black text-2xl underline underline-offset-4">
            Preview & Edit GDSC Event
          </h1>
        </div>
        <ListEvent />
      </div>
    </Layout>
  );
}
