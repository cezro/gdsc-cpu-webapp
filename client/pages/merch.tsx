import React, { Fragment, useEffect, useState } from 'react';
import { getErrorMessage } from '@/utils/utilFunctions';
import CustomHeader from '@/components/CustomHeader';
import CustomContainer from '@/components/ui/customContainer';
import MerchList from '@/components/MerchList';
import host from '@/utils/host';

type Merch = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
};

function Merch() {
  const [merches, setMerches] = useState<Merch[]>([]);
  // const [userId, setUserId] = useState<number | string>('');
  // merches.forEach((merch) => alert(merch));
  const getAllMerches = async () => {
    try {
      const response = await fetch(`${host}/admin/admin-merch`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonData = await response.json();
      // const userId = jsonData.userId;

      // setUserId(userId);
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
      <CustomHeader />
      <CustomContainer>
        <div className="space-y-10 pb-10">
          <div>
            <h1 className="text-center text-xl font-bold">GDSC Merch</h1>
          </div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <MerchList items={merches} />
          </div>
        </div>
      </CustomContainer>
    </Fragment>
  );
}

export default Merch;
