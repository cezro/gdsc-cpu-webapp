import CustomHeader from '@/components/CustomHeader';
import { Button } from '@/components/ui/button';
import CustomContainer from '@/components/ui/customContainer';
import Link from 'next/link';
import React, { Fragment } from 'react';

export default function Landing() {
  return (
    <Fragment>
      <CustomHeader />
      <CustomContainer>
        <div className="space-y-10 pb-10">
          <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
            <div
              style={{ backgroundImage: `url(/blur-bg.png)` }}
              className="rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-md sm:max-w-xl max-w-xs text-white dark:text-white bg-secondary/60 p-4 rounded-lg">
                  Google Developers Student Clubs - CPU
                  <Button size="lg" className="w-full py-6 text-xl">
                    <Link href="/signup">Sign-up Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"></div>
        </div>
      </CustomContainer>
    </Fragment>
  );
}
