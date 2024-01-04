import React, { Fragment, useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/utilFunctions";
import CustomHeader from "@/components/CustomHeader";
import CustomContainer from "@/components/ui/customContainer";
import MerchList from "@/components/MerchList";

type Merch = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
};

function Merch() {
  const [merches, setMerches] = useState<Merch[]>([]);

  const getAllMerches = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/admin-merch");
      const jsonData = await response.json();

      setMerches(jsonData);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }

  useEffect(() => {
    getAllMerches();
  }, [] /* bracket ensures useEffect does not repeatedly request multiple times */);

  return (
    <Fragment>
      <CustomHeader />
      <CustomContainer>
        <div className="space-y-10 pb-10">
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
  )
}

export default Merch;