/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/utilFunctions';
import EditMerch from './EditMerch';
import host from '@/utils/host';

type Merch = {
  id: number;
  name: string;
  merch_quantity: number;
  fname: string;
  lname: string;
  email: string;
  shipping_province: string;
  shipping_city: string;
  shipping_street: string;
  shipping_house_number: string;
  date_time_submitted: string;
};

const PreOrderStats = () => {
  const [merches, setMerches] = useState<Merch[]>([]);

  //delete merch function
  const deletePreorder = async (id: number) => {
    try {
      const deletePreorder = await fetch(`${host}/pre-order-form/${id}`, {
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

  const getAllMerchStats = async () => {
    try {
      const response = await fetch(`${host}/pre-order-form-merch-join`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonData = await response.json();

      setMerches(jsonData.allMerchStats);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  useEffect(
    () => {
      getAllMerchStats();
    },
    [] /* bracket ensures useEffect does not repeatedly request multiple times */
  );

  return (
    <Fragment>
      <table className="table-auto mt-4 text-center text-black">
        <thead>
          <tr>
            <th className="px-4 py-2">Merch Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">User Firstname</th>
            <th className="px-4 py-2">User Lastname</th>
            <th className="px-4 py-2">User Email</th>
            <th className="px-4 py-2">Province</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Street</th>
            <th className="px-4 py-2">House #</th>
            <th className="px-4 py-2">Date Submitted</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {merches.map((merch) => (
            <tr key={merch.id}>
              <td className="border px-4 py-2">{merch.name}</td>
              <td className="border px-4 py-2">{merch.merch_quantity}</td>
              <td className="border px-4 py-2">{merch.fname}</td>
              <td className="border px-4 py-2">{merch.lname}</td>
              <td className="border px-4 py-2">{merch.email}</td>
              <td className="border px-4 py-2">{merch.shipping_province}</td>
              <td className="border px-4 py-2">{merch.shipping_city}</td>
              <td className="border px-4 py-2">{merch.shipping_street}</td>
              <td className="border px-4 py-2">
                {merch.shipping_house_number}
              </td>
              <td className="border px-4 py-2">{merch.date_time_submitted}</td>
              <td>
                <button
                  className="h-10 w-20 bg-red-600 border rounded-md hover:bg-blue-800"
                  onClick={() => deletePreorder(merch.id)}
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

export default PreOrderStats;
