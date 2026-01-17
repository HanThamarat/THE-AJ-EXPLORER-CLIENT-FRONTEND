'use client';

import Coupon from './contents/coupon';
import Hero from './layout/Hero';

export default function ClientComponent() {



  return (
    <>
      <Hero />
      <div className='h-[200px] md:h-[260px]'></div>
      <Coupon />
    </>
  );
}