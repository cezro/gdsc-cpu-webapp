import CustomHeader from '@/components/CustomHeader';
import CustomContainer from '@/components/ui/customContainer';
import React, { Fragment } from 'react';

export default function Landing() {
  return (
    <Fragment>
      <CustomHeader />
      <CustomContainer>
        <div className="space-y-10 pb-10">
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"></div>
        </div>
      </CustomContainer>
    </Fragment>
  );
}
