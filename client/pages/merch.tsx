import React, { Fragment, useEffect, useState } from 'react';
import { getErrorMessage } from '@/utils/utilFunctions';
import CustomHeader from '@/components/CustomHeader';
import CustomContainer from '@/components/ui/customContainer';
import MerchList from '@/components/MerchList';
import host from '@/utils/host';
import Link from 'next/link';

type Merch = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
};

function Merch() {
  const [merches, setMerches] = useState<Merch[]>([]);
  // merches.forEach((merch) => alert(merch));
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
      <CustomHeader />
      <CustomContainer>
        <div className="space-y-10 pb-10">
          <div>
            <Link href="/landing" className="ml-4 lg:ml-0">
              <h1 className="text-center text-xl font-bold">GDSC Merch</h1>
            </Link>
          </div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <MerchList items={merches} />
          </div>
        </div>
      </CustomContainer>

      {/* <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {merches.map(merch => (
          <Col key={merch.id}>
            <StoreItem {...merch} />
          </Col>
        ))}
      </Row> */}
    </Fragment>
  );
}

export default Merch;
