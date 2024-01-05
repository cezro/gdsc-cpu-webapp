/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/utilFunctions';
import EditMerch from './EditMerch';
import host from '@/utils/host';

type Merch = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
};

const ListMerch = () => {
  const [merches, setMerches] = useState<Merch[]>([]);

  //delete merch function
  const deleteMerch = async (id: number) => {
    try {
      const deleteMerch = await fetch(`${host}/admin/admin-merch/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMerches(merches.filter((merch) => merch.id !== id));
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  const getAllMerches = async () => {
    try {
      const response = await fetch(`${host}/admin/admin-merch`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonData = await response.json();

      setMerches(jsonData.allMerches);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  useEffect(
    () => {
      getAllMerches();
    },
    [] /* bracket ensures useEffect does not repeatedly request multiple times */
  );

  return (
    <Fragment>
      <table className="table-auto mt-4 text-center text-black">
        <thead>
          <tr>
            <th className="px-4 py-2">Merch Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {merches.map((merch) => (
            <tr key={merch.id}>
              <td className="border px-4 py-2">{merch.name}</td>
              <td className="border px-4 py-2">{merch.description}</td>
              <td className="border px-4 py-2">
                <img src={`${host}/${merch.image}`} alt={merch.name} />
              </td>
              <td>₱{merch.price}</td>
              <td>
                <EditMerch merch={merch} />
              </td>
              <td>
                <button
                  className="h-10 w-20 bg-red-600 border rounded-md hover:bg-blue-800"
                  onClick={() => deleteMerch(merch.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListMerch;
