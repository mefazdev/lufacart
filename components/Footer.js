import Link from 'next/link';
import React from 'react'

import { AiOutlineHome } from "react-icons/ai";

import { BiCategory } from "react-icons/bi";
import { BsTelephoneOutbound } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  return (
    <div className='footer flex'>
        <Link href={'/'} style={{textDecoration:'none',color:"inherit"}}><div >
            <AiOutlineHome id='foot__icon'/>
        <p>Home</p></div></Link>
        <Link href={'/Categories'} style={{textDecoration:'none',color:"inherit"}}><div><BiCategory id='foot__icon'/><p>Categories</p></div></Link>
        <a   href="tel:+91 9847360346">
        <div><BsTelephoneOutbound id='foot__icon'/><p>Call</p></div>
                        </a>
                        <a href="whatsapp://send?phone=+971 525035395" data-action="share/whatsapp/share"    >
                        <div><BsWhatsapp id='foot__icon'/><p>Whatsapp</p></div>
  </a>
        
    </div>
  )    
}
