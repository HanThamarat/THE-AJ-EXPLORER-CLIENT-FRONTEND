'use client';

import Coupon from './contents/coupon';
import FlowSection from './contents/flow/FlowSection';
import Hero from './layout/Hero';

export default function ClientComponent() {



  return (
    <>
      <Hero />
      <div className='h-[180px]'></div>
      <div className='flex flex-col gap-[35px]'>
        <Coupon />
        <FlowSection />
      </div>
    </>
  );
}
