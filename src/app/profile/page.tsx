/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

import './profile.css';

import Header from '@/components/Header/userHeader';
import AddSocialLink from '@/components/links/addSocialLink';
import ProfileEditModal from '@/components/modal/profileEditModal';

import { useAppSelector } from '@/redux/hook';

const Profile = () => {
  const userInfo = useAppSelector((state) => state.userReducer.user);
  const [editModal, setEditModal] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);

  const popModal = () => {
    setEditModal(!editModal);
  };

  const toggleAddLink = () => {
    setShowAddLink(!showAddLink);
  };

  return (
    <>
      <div className='relative z-10'>
        <div
          className={`flex w-full items-center justify-center ${
            editModal && 'fixed bg-[#F7F7F7] opacity-20'
          }`}
        >
          <Header />
          <div className='h-screen w-[500px] pl-[100px] pr-10'>
            <div className='self-strech flex h-screen flex-col items-start gap-[26px] px-8 py-32'>
              <img src='/avatar.svg' alt='avatar' width={80} height={80} />
              <div className='text-[32px] font-semibold leading-tight'>
                {userInfo?.firstName + ' ' + userInfo?.lastName}
              </div>
              <div className='text-base font-normal text-[#18161C66]'>
                {userInfo?.bio}
              </div>
              <button
                className='text-primary-default flex items-center justify-center gap-2 px-3 py-1.5'
                onClick={popModal}
              >
                <img
                  src='/images/edit-03.png'
                  alt='edit'
                  width={18}
                  height={18}
                />
                Edit Profile
              </button>
            </div>
          </div>
          <div className='content flex h-screen flex-col items-start gap-10 bg-[#D7D7D7] opacity-40'></div>
          <div className='h-screen w-[100px]'></div>
          <div className='footer relative flex w-full cursor-pointer gap-[10px] px-8 py-4'>
            <img
              src='/images/add.png'
              alt='add'
              width={64}
              height={64}
              onClick={toggleAddLink}
            />
            <AddSocialLink
              showAddLink={showAddLink}
              toggleAddLink={toggleAddLink}
            />
          </div>
        </div>
        <div
          className={`fixed z-10 w-screen overflow-y-auto ${
            editModal && 'inset-0'
          }`}
        >
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <ProfileEditModal editModal={editModal} popModal={popModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
