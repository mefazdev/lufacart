import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import logo from '../assets/images/logo.png'
import { db } from '../firebase';
import Cookies from "universal-cookie";
import Link from 'next/link';
export default function DashHeader() {
  const cookies = new Cookies();
    const router = useRouter()
    const logout = async () =>{
        const docRef = doc(db, 'admin','DEtiZyODqIh72dXUVB1L' );
        const updateRef=  await updateDoc (docRef,  {
            admin:false
           })
           cookies.set('admin', false ,{ path: '/' });
           router.push('/admin/Login')
     }

  return (
    <div className='ad__nav'>
        <div className='ad__nav__content'>
          <div className='flex justify-center'>
          <div className='ad__logo'><Image src={logo} alt=''/></div>
          <div className='ad__nav__links ml-4'>
            <Link href='/admin/Dashboard'>Products</Link>
          </div>
          <div className='ad__nav__links ml-2'>
            <Link href='/admin/Categories'>Categories</Link>
          </div>
          </div>
        

<button onClick={logout}>LOGOUT</button>

        </div>
       
    </div>
  )
}