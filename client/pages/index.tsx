import Login from './login';
import Events from './events';
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:3000/api/home')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <main>
      <Login></Login>
      <Events></Events>
    </main>
  );
}
