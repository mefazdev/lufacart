import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
 
// import { useDispatch } from "react-redux";
import { collection, query, getDocs, doc, getDoc, updateDoc } from "@firebase/firestore";
 
 
 
import Cookies from "universal-cookie";
export default function Login() {

    const [admin,setAdmin] = useState( {})
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    
    // const [cookies, setCookie] = useCookies(['admin']);
 const router = useRouter()
    const cookies = new Cookies();
    // const admin  = cookies.get('admin')
    
    
    
        const fetchAdmin = async () => {
            const docRef = doc(db, "admin","DEtiZyODqIh72dXUVB1L");
            const docSnap = await getDoc(docRef);
        
            setAdmin(docSnap);
    
          };
     useEffect(()=>{
        fetchAdmin()
     },[])    
    
     const login = async () =>{
        
            if( username == admin.data().username && password == admin.data().password){
                await addAdmin()
                       cookies.set('admin', true ,{ path: '/' });
                        
                      router.push('/admin/Dashboard')
               
                   }else{
                       alert('Wrong username or password')
                   }
                
        }
        
     const addAdmin = async () =>{
        const docRef = doc(db, 'admin','DEtiZyODqIh72dXUVB1L' );
        const updateRef=  await updateDoc (docRef,  {
            admin:true
           })
     }
      return (
        <div className='ad__login'>
            {/* <button onClick={()=>console.log(cookies.get('admin'))}  >Clickme </button> */}
            <div className='ad__log__div__main'>
                {/* <Image src={logo} /> */}
                {/* <img src={logo} /> */}
                <div className='ad__log__div'>
           < input
           value={username}
           onChange = {((e)=>setUsername(e.target.value.toLowerCase()))}
           placeholder='USERNAME'/>
           <input
           type='password'
           value={password}
                  onChange = {((e)=>setPassword(e.target.value.toLowerCase()))}
                
           
           placeholder='PASSWORD' />
           <button onClick={login}>LOGIN</button>
           {/* <h3>{admin.data().username ? admin.data().username : ''}</h3> */}
           </div></div>
            
        </div>
      )
    }
    
