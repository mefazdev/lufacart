import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import DashHeader from "../../components/Dashheader";
import { db, storage } from "../../firebase";

export default function Categories() {
  const [cat, setCat] = useState("");
  const [thumb, setThumb] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const [uploading, setUploading] = useState(false);
const [data,setData] = useState([])

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setThumb(readerEvent.target.result);
    };
  };

  const handleUpload = async () => {
    setUploading(true);

    const docRef = await addDoc(collection(db, "category"), {
      name: cat,
    });

    const imageRef = ref(storage, `category/${docRef.id}/image`);

    await uploadString(imageRef, thumb, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "category", docRef.id), {
        image: downloadURL,
      });
    });

    setUploading(false);

    // setState(false);
    setThumb(null);
    setCatModal(false);
  };

  const deletItem = async (id) => {
    await deleteDoc(doc(db, "category", id));

  };

  
  const fetchData = async () => {
    const q = await query(
      collection(db, "category")
    
    );
        // const data =   await getDocs(q)
        // setUploads(data.docs.map((doc) => doc));

        onSnapshot(q, (snapshot) => {
          setData(snapshot.docs.map((doc) => doc));
        });
  };

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div>
      <DashHeader />

      <div className="dash__content">
        <div className="dash__head flex">
          <div className="flex"></div>

          <Button onClick={() => setCatModal(true)}>Add Category</Button>
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
                Category
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thumbnail
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
            {data.map((d,i)=>{
                return(
                    <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{"no"}</div>
                    </td>
      
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {d.data().name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div   className="flex-shrink-0 h-10 w-10">
                        <img
                        //   style={{margin:'auto',marginLeft:"15px"}}
                          className="h-10 w-10 rounded-full"
                          src={d.data().image}
                          alt=""
                        />
                      </div>
                    </td>
      
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* <Link
                                    href={`/admin/viewProfile/${encodeURIComponent(
                                      'data.id'
                                    )}`}
                                  > */}
                      <a target="_blank">
                        <button id="ad__view__btn">Edit</button>
                      </a>
                      {/* </Link> */}  
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    
                    
                      <button
                        onClick={() =>
                          deletItem(d.id)
                        }
                        id="ad__dlt__btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                )
            })}
            
            {/* );
                    })} */}
          </tbody>
        </table>
      </div>

      <Modal
        open={catModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="addModal"
      >
        <div className="add__modal">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row">
            <p>Category</p>
            <input value={cat} onChange={(e) => setCat(e.target.value)} />
          </div>

          <div className=" mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4 add__modal__row">
            <p>Thumbnail</p>

            <input
              // value={thumb}
              onChange={handleChange}
              type="file"
            />
          </div>
          <Button id="pro__save__btn" className="ml-3" onClick={handleUpload}>
            {uploading ? "Uploading" : "Save"}
          </Button>
          <Button id="pro__del__btn" onClick={() => setCatModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
