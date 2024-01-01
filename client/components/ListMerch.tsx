import React, { Fragment, useEffect, useState } from "react";
import { getErrorMessage } from "../utils/utilFunctions";
import EditMerch from "./EditMerch";

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
      const deleteMerch = await fetch(`http://localhost:3001/admin/admin-merch/${id}`, {
        method: "DELETE"
      });

      setMerches(merches.filter(merch => merch.id !== id));
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }

  //get merch function
  const getMerches = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/admin-merch");
      const jsonData = await response.json();

      setMerches(jsonData);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }

  useEffect(() => {
    getMerches();
  }, [] /* bracket ensures useEffect does not repeatedly request multiple times */);

  return (
  <Fragment>
    <table className="table-auto mt-12 text-center text-black">
      <thead>
        <tr>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Edit</th>
          <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {/*
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>john@example.com</td>
        </tr> 
        */}
        {merches.map(merch => (
          <tr key={merch.id}>
            <td className="border px-4 py-2">{merch.name}</td>
            <td className="border px-4 py-2">{merch.description}</td>
            {/* <td className="border px-4 py-2">{merch.image}</td> */}
            <td className="border px-4 py-2">P {merch.price}</td>
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
