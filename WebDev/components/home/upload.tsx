import { useState, useEffect, useRef, FormEvent } from 'react'
import { MdCloudUpload, MdDelete, MdFileUpload } from 'react-icons/md'
import axios from 'axios';
import Image from 'next/image'
import React from "react";
import { PrescriptionsData } from "@/types/medicine";
import { DNA } from 'react-loader-spinner'
import { SERVER_URL } from "@/constants"
import { fetchSampleData } from "@/app/api/actions/sampleDataAction"
import { ErrorResponse } from "@/types/response"
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

interface UploadComponentProps {
    setData: React.Dispatch<React.SetStateAction<PrescriptionsData | null>>;
  }

const Upload: React.FC<UploadComponentProps> = ({ setData }) => {
    const [image, setImage] = useState<string | null>(null)
    const [selectedFileLocal, setSelectedFileLocal] = useState<File | null>(null);
    const [csrfToken, setCsrfToken] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string | null>('No files selected');

    const [isFetching, setIsFetching] = useState(false);
    const [fetchStage, setFetchStage] = useState("Uploading...");

    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');

    function showAlert(mssg: string) {
      console.log("alert", mssg)

      toast.info(mssg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
    //for usrEmail
    useEffect(() => {
        if (session && session.user) {
          setEmail(session.user.email || '');
        }
    }, [status, session?.user?.email]);

    //save csrf token
    useEffect(() => {
      const initializeCsrfToken = async () => {
        const saved_token = sessionStorage.getItem('csrfToken');
        if (!saved_token) {
            console.log('CSRF token not found, fetching');
            try {
                const response = await axios.get(`${SERVER_URL}csrf/`,{
                  withCredentials: true,
                  params: {
                    email: email,
                  },
                });
                console.log("got token");

                const csrf_token = response.data.csrfToken;
                if(csrf_token === null)
                {
                  console.error('Error fetching CSRF token');
                  return;
                }

                sessionStorage.setItem('csrfToken', response.data.csrfToken);
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            } finally{
              return;
            }
        }
        console.log("token already there")
        setCsrfToken(saved_token);
      };
      initializeCsrfToken();
    }, []);
    
    //button press/submit handling 
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
      }
    };

    const handleFormClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setUploadStatus(event.target.files[0].name+" selected");
            // onFileUpload(event.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);

            setSelectedFileLocal(event.target.files[0])
        }
    };


    //upload file handling 
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      console.log("trying to submit ");
  
      setFetchStage('Uploading image! Takes time depending on image size.');
  
      if (!selectedFileLocal) {
        setUploadStatus('No file selected.');
        return;
      }

      setUploadStatus(null);
  
      const formData = new FormData();
      formData.append('file', selectedFileLocal);
      
      setIsFetching(true);          
      if(email === "demo@gmail.com"){
        showAlert("No files will be saved for Demo User!")
      }
  
      try {
        const response = await axios.post('/api/uploadPresc', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
            'X-email': email,
          },
          withCredentials: true,
        });
        
        setIsFetching(false);

        if(response.data.error &&  response.data.error=== "NO_DATA"){
          setUploadStatus('No Prescription data found in uploaded file!!');
          return;
        }
    
  
        console.log('Response:', response.data);
  
        const dataReceived: PrescriptionsData = {
          prescriptions: response.data.ret.data.medData.prescriptions,
          extra_info: response.data.ret.data.medData.extra_info,
          image_url: response.data.ret.file_url,
          upload_date: response.data.ret.upload_date,
          verification: response.data.ret.verification,
          verification_doc_name: response.data.ret.verification_doc_name,
          verification_date: response.data.ret.verification_date,
          verification_comment: response.data.ret.verification_comment,
        };
  
        console.log("after upload,", dataReceived);
  
        if (!dataReceived) {
          setUploadStatus('Error uploading file...');
          return;
        }

        if(dataReceived.prescriptions.length <=0 ){
          setUploadStatus('No data found in file');
          return;
        }
  
        setData(dataReceived);
      } catch (error: any) {
        if (error.request) {
          console.error('Error request data:', error.request);
        }
        console.error('Error message:', error.message);
  
        setUploadStatus('Error uploading file.');
      }
      finally {
        setIsFetching(false);
      }
  };
  

  //sample data get 
  const getSampleData = async () => {

    try{
      const response = await fetchSampleData();
      
      if(!response){
        console.error("No response from server");
        return null;
      }

      if ((response as ErrorResponse).error) {
        console.error("Error occurred:", (response as ErrorResponse).error);
        return null;
      }

      setData(response as PrescriptionsData);
    }
    catch (error: any) {
      console.log("Error fetching sampleData",error);
    }
  };

    return (
      <div className='flex flex-col justify-between items-center'>
        
        {/* <button 
          type="button"
          onClick={getSampleData} className='p-4 m-5 text-white border border-white'>
          getdata
        </button> */}

        <form
            onClick={handleFormClick} 
            className={`flex flex-col justify-center items-center border-2 border-dashed border-primary-500 w-full cursor-pointer 
            rounded-lg p-5 text-white h-screen-50 max-h-screen-50 sm:h-screen-25 md:h-screen-50 sm:max-h-screen-25 md:max-h-screen-50 relative 
            ${image && 'bg-dark-4'} ${isFetching ? 'pointer-events-none' : ''}`}
            ref={formRef}
            onSubmit={handleSubmit}
        >
          {isFetching ? 
            <div>
              <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />

              <div className='text-base-medium text-center'>
                {fetchStage}
              </div>
            </div>
          :
          <div className='flex flex-col justify-between items-center' >
            <input 
              type="file" 
              className='input-field'
              hidden
              onChange={handleFileChange} 
              ref={fileInputRef}
            />

            {image ?
              <Image
                src={image}
                alt="selected image"
                layout="fill" 
                objectFit="contain"
                />
              : 
              <>
              <MdCloudUpload className="text-primary-500 w-20 h-20" />
              <p>Upload a prescription to get started</p>
              </>
            }
            </div>
          }
        </form>

        <div className="mt-4 flex justify-between items-center p-4 rounded-lg text-base font-medium text-white bg-dark-2 "> 
        {uploadStatus} 
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-evenly items-center gap-4 p-4 m-4"> 
          
            <button 
              disabled = { image? false:true }
              type="button"
              className={`flex flex-row rounded-lg bg-primary-500 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 
                hover:bg-prim-hov dark:shadow-submit-dark ${image ? '' : 'opacity-50 pointer-events-none bg-prim-hov'} `}
                onClick={handleButtonClick}
            >
                <MdFileUpload className="text-white w-5 h-5" />Upload
            </button>

            <button 
                disabled = { image? false:true }
                className={`flex flex-row rounded-lg bg-primary-500 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 
                  hover:bg-prim-hov dark:shadow-submit-dark ${image ? '' : 'opacity-50 pointer-events-none bg-prim-hov'}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setUploadStatus("No selected File")
                    setImage(null)
                    }}
              >
                  <MdDelete className="text-white w-5 h-5" />Delete
            </button>
        </div> 
      </div>
    )
}

export default Upload