/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import './signup.css';

import { signUpAsync } from '@/api/auth';

const Signup = () => {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    accountId: '',
  });

  const onChange = (e: any) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    const res = await signUpAsync(registerData);
    if (res.data.id) {
      router.push('/signin');
    }
  };

  const router = useRouter();

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-[#F2F2F2] bg-no-repeat'>
      <div className='w-[500px] items-center justify-center rounded-2xl bg-[#FFFFFF] p-6 pt-4 text-black max-sm:w-[300px]'>
        <div className='mb-3 flex justify-end'>
          <img src='/images/cancel.png' alt='cancel' className='h-10 w-10' />
        </div>
        <div className='flex flex-col items-start gap-6 px-6 pb-6'>
          <h1 className='text-[32px]'>Sign up</h1>
          <div className='row'>
            <div className='item'>
              <label className='text-[#595B5A]'>First name</label>
              <input
                className='w-full rounded-lg'
                placeholder='Jon'
                name='firstName'
                value={registerData.firstName}
                onChange={onChange}
              />
            </div>
            <div className='item'>
              <label className='text-[#595B5A]'>Last name</label>
              <input
                className='w-full rounded-lg'
                placeholder='Smith'
                name='lastName'
                value={registerData.lastName}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='item w-full'>
            <label className='text-[#595B5A]'>Email</label>
            <input
              className='w-full rounded-lg'
              placeholder='Jon@gmail.com'
              name='email'
              value={registerData.email}
              onChange={onChange}
            />
          </div>
          <div className='item w-full'>
            <label className='text-[#595B5A]'>Account ID</label>
            <input
              className='w-full rounded-lg '
              placeholder='Jon_S'
              name='accountId'
              value={registerData.accountId}
              onChange={onChange}
            />
          </div>
          <div className='item w-full'>
            <button
              className='bg-primary-default h-11 gap-1 self-stretch rounded-lg px-2 py-1 text-sm text-white'
              onClick={registerUser}
            >
              continue
            </button>
          </div>
          <div className='inline-block w-full text-base'>
            Already have an account?
            <span
              className='text-primary-default cursor-pointer pl-1 font-semibold'
              onClick={() => router.push('/signin')}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
