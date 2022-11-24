import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import LapNav from "../components/LapNav";
import { db } from "../firebase";
import logo from '../assets/images/logo.png'
import { HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import Footer from "../components/Footer";
export default function Category() {
  const router = useRouter();
  const [collapse,setCollapse] = useState(false)
  const [data, setData] = useState([]);
  const [searchKey,setSearchKey] = useState('')
  const fetchData = async () => {
    const q = await query(
      collection(db, "category"),
    
    );
    const data = await getDocs(q);
    setData(data.docs.map((doc) => doc.data()));
  };


  useEffect(() => {
    
      fetchData()
 

  }, []);
  return (
    <div>
      {/* <LapNav/>  */}

      <div className='mobnav'>
      <AiOutlineMenu className='menu__icon'
      onClick={()=>setCollapse(!collapse)}
      />
      <div className='mob__logo'>
        <Image src={logo} />
      </div>

      <div className="relative mt-5">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search"
              required
              value={searchKey}
              onChange={(e)=>setSearchKey(e.target.value)}
              style={{outline:'none'}}
            />
            <button className="absolute top-0 right-0 p-2.5 text-sm font-medium text-gray-500  rounded-r-lg      focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
{collapse  ? <div className='nav__collapse'>
<AiFillCloseCircle className='nav__close'
onClick={()=>setCollapse(false)}
/>
<Link href='/'><div className='mt-1'>
                <p>Home</p>
            </div></Link>
            <Link href={'/'}><div className='mt-2'><p>About</p></div></Link>
             <Link href={'/Categories'}><div className='mt-2'><p>Categories</p></div></Link>
            
          </div> : ''}
          
    </div>
      {/* <LapNav/> */}
    <div className="webnav">
      <div className="webnav__content">
        <div className="webnav__left flex">
        <Link href={'/'}><div className="web__logo">
            <Image src={logo} />
          </div></Link>

          <div className="webnav__links">
            <Link style={{ textDecoration: "none", color: "inherit" }} href={"/"}>
              <p
                className="  px-3 py-2 rounded-md  font-medium"
                aria-current="page"
              >
                Home
              </p>
            </Link>
            <Link style={{ textDecoration: "none", color: "inherit" }} href={"/"}>
              <p
                className="  px-3 py-2 rounded-md  font-medium"
                aria-current="page"
              >
                About{" "}
              </p>
            </Link>
            <Link style={{ textDecoration: "none", color: "inherit" }} href={"/"}>
              <p
                className="  px-3 py-2 rounded-md  font-medium"
                aria-current="page"
              >
                Categories
              </p>
            </Link>
             
          </div>
        </div>

        <div className="webnav__center ml-5 w-full">
          <div className="relative">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search"
              required
              value={searchKey}
              style={{outline:'none'}}
              onChange={(e)=>setSearchKey(e.target.value)}
            />
            <button className="absolute top-0 right-0 p-2.5 text-sm font-medium text-gray-500  rounded-r-lg      focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* <div className='webnav__right'>
             <HiOutlineUserCircle id='nav__avatar'/>
        </div> */}
      </div>
    </div> 
      <div className="cgry pt-10">

        <h2>All Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-2">

{data.filter((d)=>{
if(searchKey == ""){
  return d
}else if(
  d.name.toLowerCase().includes(searchKey.toLowerCase())
){
  return d
}
}).map((d,i)=>{
            return(

                    <div className="pro__div p-1">
                            <Link   href={`/category/${d.name}`}><img src={d.image}/>
            <div className="pro__div__bottom p-2">
              <p> {d.name}</p>
              </div></Link>
          </div>
     

            )
          })}
          
        </div>
      </div>
      <Footer/>
    </div>
  );
}
 