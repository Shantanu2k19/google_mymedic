"use client"
import { useCollapse } from 'react-collapsed'
import Image from 'next/image'
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { history } from "@/types/history";
import { useState, useEffect, useRef, FormEvent } from 'react'
import axios from 'axios';

import { fetchHistory } from '@/lib/actions/historyAction';


async function CollapsibleList (){
  // const [csrfToken, setCsrfToken] = useState<string>('');
  
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       console.log("fetching csrf token");
//       try {
//         const response = await axios.get('http://localhost:8000/csrf/',{
//           withCredentials: true,
//           params: {
//             username: 'your_username_here',
//           },
//         });
//         console.log("got token");
//         setCsrfToken(response.data.csrfToken);
//       } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//       }
//     };

//     fetchCsrfToken();
// }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetchHistory('user123');
//       console.log(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchData();
// }, []); 


    const result = await fetchHistory('user123');
    console.log("result--",result);
  return (<>
  </>
  );
};


export default CollapsibleList;