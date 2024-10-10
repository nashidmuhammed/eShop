'use client';
import { BsSearch } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import AutoSearch from './AutoSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../redux/settingsSlice';
import { DotzBaseUrlV1 } from '@/utils/GlobalVariables';
import { useEffect, useState } from 'react';

const HeaderMain = ({setLoader}) => {
  // const dispatch = useDispatch();
  // const { theme, language, notificationsEnabled } = useSelector((state) => state.settings);
  const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));
  const shopname = organizationDetails.name
  const router = useRouter();
  const {cartTotalQty} = useCart()
  const queryParams = useSearchParams()
  const search = queryParams.get('q');

  const handleClickLogo = () => {
    setLoader(true)
    router.push(`/in/${organizationDetails.shopname}`)
    setLoader(false)
  };
  const handleClickCart = () => {
    setLoader(true)
    router.push(`/in/${organizationDetails.shopname}/cart`)
  };


  return (
    <div className='border-b border-gray-200 py-6'>
        <div className="container sm:flex justify-between items-center">
            <div onClick={handleClickLogo} className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish cursor-pointer">
                {shopname}
            </div>
            <div className="w-full sm:w-[300px] md:w-[70%] relative">
                {/* <input className='border-gray-200 border p-2 px-4 rounded-lg w-full' type="text" placeholder='Enter any product name...' />
                <BsSearch className='absolute right-0 top-0 mr-3 mt-3 text-gray-400' size={20} /> */}
                <AutoSearch search={search} />
            </div>
            <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
                <BiUser className='cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200' onClick={() => {toast.error("Coming soon...")}}/>
                {/* <div className="relative">
                    <FiHeart />
                    <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">0</div>
                </div> */}
                <div className="relative cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200" onClick={handleClickCart}>
                    <HiOutlineShoppingBag />
                    <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">{cartTotalQty}</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default HeaderMain