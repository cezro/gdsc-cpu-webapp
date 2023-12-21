import React, { useEffect } from 'react';
import Layout from '../../components/Layout';

export default function AdminHome() {
  useEffect(() => {
    fetch('http://localhost:3001/admin/admin-home')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <Layout>
      <h1 className="text-stone-900">Welcome Admin!</h1>
      {/*home page content */}
    </Layout>
  );
}
