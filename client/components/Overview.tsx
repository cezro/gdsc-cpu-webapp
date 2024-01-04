import React, { useState, useEffect } from 'react';
import { getErrorMessage } from '@/utils/utilFunctions';

type Member = {
  id: number;
  fname: string;
  lname: string;
}

export default function Overview() {
  const [members, setMembers] = useState<Member[]>([])

  const getMembers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/admin-home', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const jsonData = await response.json()

      setMembers(jsonData.allMembers)
    } catch(err) {
      console.error(getErrorMessage(err))
    }
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div className="border border-black h-3/4 w-3/4 my-10 mx-7 p-4 bg-gray-100 rounded-md">
      <div className="flex flex-col space-y-8">
        <div className="border border-black h-24 rounded-md">
          <h2 className="text-xl text-black p-4">
            Predictions using Machine Learning will be placed here
          </h2>
        </div>
        <div className="h-96 flex flex-row space-x-3">
          <div className="flex-1 p-4 border border-black rounded-md">
            <h2 className="text-xl text-black font-bold mb-4">Graphs</h2>
            <p className="text-gray-700">
              This will contain a graph for the analytics.
            </p>
          </div>
          <div className="flex-1 p-4 border border-black rounded-md overflow-auto">
            <h2 className="text-xl text-black font-bold mb-4">Members</h2>
            <ul className="list-inside list-decimal text-black">
              {members.map((member) => (
                <li key={member.id}>
                  {member.fname} {member.lname}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
