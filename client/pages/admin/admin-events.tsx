import React, { useEffect } from 'react';
import Layout from '../../components/Layout';

export default function AdminEvents() {
  useEffect(() => {
    fetch('http://localhost:3001/admin/admin-events')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <Layout>
      <div className="my-6">
        <h1 className="text-black text-3xl underline underline-offset-4">
          Create GDSC Event
        </h1>
      </div>
      <div className="flex flex-col space-y-8">
        <div>
          <p className="text-black text-lg font-semibold mb-1">Event Name</p>
          <input
            className="text-black h-8 w-64 border border-stone-900"
            placeholder="Name"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">
            Event Venue/Location
          </p>
          <input
            className="text-black h-8 w-64 border border-stone-900"
            placeholder="Venue"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">Date</p>
          <input
            className="text-black h-8 w-64 border border-stone-900"
            placeholder="Date"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">Time</p>
          <input
            className="text-black h-8 w-64 border border-stone-900"
            placeholder="Time"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">
            Event Description
          </p>
          <textarea
            className="text-black h-24 w-1/2 border border-stone-900"
            placeholder="Description"
          />
        </div>
        <div>
          <p className="text-black text-lg font-semibold mb-1">
            Featured Event Photo
          </p>
          <input
            type="file"
            className="text-black"
            accept="image/png, image/jpeg"
          />
        </div>
        <div>
          <button className="h-10 w-40 bg-blue-600 border rounded-md hover:bg-blue-800">
            Publish Event
          </button>
        </div>
      </div>
    </Layout>
  );
}
