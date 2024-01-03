import React, { useState, useEffect } from 'react';

export default function Overview() {
  //sample members
  const memberList = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Doe' },
    { id: 3, firstName: 'Alice', lastName: 'Smith' },
    { id: 4, firstName: 'Greta', lastName: 'Lois' },
    { id: 5, firstName: 'Wayne', lastName: 'Kag' },
    { id: 6, firstName: 'Bob', lastName: 'Johnson' },
    { id: 7, firstName: 'Emily', lastName: 'Williams' },
    { id: 8, firstName: 'Michael', lastName: 'Brown' },
    { id: 9, firstName: 'Ava', lastName: 'Miller' },
    { id: 10, firstName: 'Daniel', lastName: 'Davis' },
    { id: 11, firstName: 'Sophia', lastName: 'Martinez' },
    { id: 12, firstName: 'David', lastName: 'Taylor' },
    { id: 13, firstName: 'Olivia', lastName: 'Anderson' },
    { id: 14, firstName: 'James', lastName: 'Thomas' },
    { id: 15, firstName: 'Emma', lastName: 'Hernandez' },
    { id: 16, firstName: 'Christopher', lastName: 'Jackson' },
    { id: 17, firstName: 'Isabella', lastName: 'White' },
    { id: 18, firstName: 'William', lastName: 'Harris' },
    { id: 19, firstName: 'Mia', lastName: 'Clark' },
    { id: 20, firstName: 'Elijah', lastName: 'Young' },
    { id: 21, firstName: 'Avery', lastName: 'Lee' },
    { id: 22, firstName: 'Benjamin', lastName: 'Garcia' },
    { id: 23, firstName: 'Charlotte', lastName: 'Brown' },
  ];
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
              {memberList.map((member) => (
                <li key={member.id}>
                  {member.firstName} {member.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
