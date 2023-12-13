import Login from './login';
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:3001/db/test')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <main>
      <Login></Login>
    </main>
  );
}
