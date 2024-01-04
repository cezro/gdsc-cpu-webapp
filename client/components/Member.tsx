import React, { Fragment, useState, useEffect } from 'react';
import { getErrorMessage } from '@/utils/utilFunctions';

type Member = {
  id: number;
  fname: string;
  lname: string;
  email: string;
};

export default function Member() {
  const [members, setMembers] = useState<Member[]>([]);

  const getAllMembers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/admin-home', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();

      setMembers(jsonData.allMembers);
    } catch (err) {
      console.error(getErrorMessage(err));
      setMembers([])
    }
  };

  const removeMember = async (id: number) => {
    try {
      const deleteMember = await fetch(
        `http://localhost:3001/admin/admin-home/${id}`,
        {
          method: 'DELETE',
        }
      );

      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <Fragment>
      <table className="mx-7 border border-black mt-12 table-auto text-center text-black">
        <thead>
          <tr>
            <th className="border border-black text-black px-4 py-2">
              First Name
            </th>
            <th className="border border-black text-black px-4 py-2">
              Last Name
            </th>
            <th className="border border-black text-black px-4 py-2">Email</th>
            <th className="border border-black text-black px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="border border-black px-4 py-2">{member.fname}</td>
              <td className="border border-black px-4 py-2">{member.lname}</td>
              <td className="border border-black px-4 py-2">{member.email}</td>
              <td className="border border-black px-4 py-2">
                <button
                  className="h-10 w-20 border border-black rounded-md hover:bg-slate-600 hover:text-white"
                  onClick={() => removeMember(member.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
