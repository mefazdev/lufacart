import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setIndexConfiguration, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
 
import DashHeader from '../../components/Dashheader'
import { db } from '../../firebase'
 
export default function Dashbord() {
 const [name,setName] = useState('')
 const [category,setCategory] = useState('')
 const [link,setLink] = useState('')
 const [imgLink,setImgLink] = useState('')
 const [price,setPrice] = useState('')
 const [maxPrice,setMaxPrice] = useState('')
const [proModal,setProModal] = useState(false)
const [catModal,setCatModal] = useState(false)
const [cats,setCats] = useState([])
const [products,setProducts] = useState([])
const [saving,setSaving] = useState(false)
const [editModal,setEditModal] = useState(false)
const [id,setId] = useState('')
const controlAdd = ()=>{
  setProModal(true)
  fetchCategroy()
}

const fetchCategroy = async () => {
  const q = await query(
    collection(db, "category"),
    // orderBy("timestamp", "desc")
  );
      const data =   await getDocs(q)
        setCats(data.docs.map((doc) => doc.data()));
     
};


const addProduct = async  ()=>{
  setSaving(true)
  const docRef = await addDoc(collection(db, "products"), {
    name: name,
    link:link,
    imgLink:imgLink,
    category:category,
    price:price,
    maxPrice:maxPrice
  });
  setProModal(false)
  setSaving(false)
}

const deletItem = async (id) => {
  await deleteDoc(doc(db, "products", id));

};


const fetchProducts = async () => {
  const q = await query(
    collection(db, "products")
  
  );
      // const data =   await getDocs(q)
      // setUploads(data.docs.map((doc) => doc));

      // const data =   await getDocs(q)
      // setProducts(data.docs.map((doc) => doc));  

      onSnapshot(q, (snapshot) => {
        setProducts(snapshot.docs.map((doc) => doc));
      });
};

const editPro = async(name, id, link, imgLink, price, maxPrice, category)=>{
  setEditModal(true)
setName(name)
setId(id)
setLink(link)  
setImgLink(imgLink)
setPrice(price)
setMaxPrice(maxPrice)
setCategory(category)
console.log(name)

}
const updatePro = async()=>{
  await updateDoc(doc(db, "products",id), {
    name: name,
    link:link,
    imgLink:imgLink,
    category:category,
    price:price,
    maxPrice:maxPrice
  });
  setEditModal(false)
}
useEffect(() => {
  fetchProducts();
}, []);
  return (
    <div >
<DashHeader/>





<div className='dash__content'>
  
 <div className='dash__head flex'>

  <div   className='flex'>
  
{/* <input className='ml-4' placeholder='Key word'/> */}
 </div>

  <Button onClick={controlAdd}>Add Product</Button>
</div>
<table className="min-w-full divide-y divide-gray-200 mt-10">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            #
                          </th>
                          
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                           Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                           max Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          > 
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
          
                     {products.map((data,index)=>{
                      const no = products.length - index;
                      const d = data.data();
                      // const dt = d.date;
                      // const date = moment.unix(dt).format("MMM DD, YY");
                      return  (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {no}
                            </div>
                          </td>
                           
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-0">
                                <div className="text-sm font-medium text-gray-900">
                                  {d.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={d.imgLink}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {d.category}
                            </div>
                             
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {d.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {d.maxPrice}
                            </div>
                          </td>
                          

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             
                              <a target="_blank">
                                <button id="ad__view__btn"
                                
                                onClick={()=>editPro(d.name,data.id,d.link,d.imgLink,d.price,d.maxPrice,d.category)}
                                >Edit</button>
                              </a>   
                           
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() =>
                                deletItem(data.id)
                              }
                              id="ad__dlt__btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                       );
                     })} 
                         
                      </tbody>
                    </table>
</div>




<Modal
  open={proModal}
  // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  id='addModal'
>
 <div className='add__modal'>
   <div className='grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Product name:</p>
    <input value={name}
    onChange={(e)=>setName(e.target.value)}
    />
   </div>

   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Category:</p>
    <select  
    value={category}
onChange={(e)=>setCategory(e.target.value)}
    >
      <option value={''}>Select</option>
       {
        cats.map((d,i)=>{
          return(
            <option key={i}>{d.name}</option>
          )
        })
       }
    </select>
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Link:</p>
    
    <input value={link}
    onChange={(e)=>setLink(e.target.value)}
    />
   
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Image link:</p>
     
    <input value={imgLink}
    onChange={(e)=>setImgLink(e.target.value)}
    />
 
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Price:</p>
     
    <input value={price}
    onChange={(e)=>setPrice(e.target.value)}
    />
 
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Last price:</p>
     
    <input value={maxPrice}
    onChange={(e)=>setMaxPrice(e.target.value)}
    />
 
   </div>
   <Button id='pro__save__btn' className='ml-3'
   onClick={addProduct}
   >{saving ? 'Saving' : 'Save'}</Button>
   <Button id='pro__del__btn' onClick={()=>setProModal(false)}>Cancel</Button>
   
 </div>
 
    

</Modal>
<Modal
  open={editModal}
  // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  id='addModal'
>
 <div className='add__modal'>
   <div className='grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Product name:</p>
    <input value={name}
    onChange={(e)=>setName(e.target.value)}
    />
   </div>

   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Category:</p>
    <select  
    value={category}
onChange={(e)=>setCategory(e.target.value)}
    >
      <option value={''}>Select</option>
       {
        cats.map((d,i)=>{
          return(
            <option>{d.name}</option>
          )
        })
       }
    </select>
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Link:</p>
    
    <input value={link}
    onChange={(e)=>setLink(e.target.value)}
    />
   
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Image link:</p>
     
    <input value={imgLink}
    onChange={(e)=>setImgLink(e.target.value)}
    />
 
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Price:</p>
     
    <input value={price}
    onChange={(e)=>setPrice(e.target.value)}
    />
 
   </div>
   <div className=' mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row'>
    <p>Last price:</p>
     
    <input value={maxPrice}
    onChange={(e)=>setMaxPrice(e.target.value)}
    />
 
   </div>
   <Button id='pro__save__btn' className='ml-3'
   onClick={updatePro}
   >{saving ? 'Saving' : 'Save'}</Button>
   <Button id='pro__del__btn' onClick={()=>setEditModal(false)}>Cancel</Button>
   
 </div>
 
    

</Modal>
 
 
    </div>
  )
}
