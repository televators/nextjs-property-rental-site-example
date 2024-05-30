'use client';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  console.log('i b when she stroganoff my beef n i wuhh');

  return (
    <>
      <h1 className='text-3xl'>Welcome</h1>
      <Link href='/properties'>Show properties</Link>
    </>
  );
};

export default HomePage;
