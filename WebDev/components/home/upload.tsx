import { useState, useEffect, useRef, FormEvent } from 'react'
import { MdCloudUpload, MdDelete, MdFileUpload } from 'react-icons/md'
import axios from 'axios';
import Image from 'next/image'

interface UploadComponentProps {
    onFileUpload: (file: File) => void;
  }

const Upload: React.FC<UploadComponentProps> = ({ onFileUpload }) => {
    const [image, setImage] = useState<string | null>(null)
    const [selectedFileLocal, setSelectedFileLocal] = useState<File | null>(null);
    const [csrfToken, setCsrfToken] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('No files selected');

    useEffect(() => {
        const fetchCsrfToken = async () => {
          console.log("fetching csrf token");
          try {
            const response = await axios.get('http://localhost:8000/csrf/',{
              withCredentials: true,
              params: {
                username: 'your_username_here',
              },
            });
            console.log("got token");
            setCsrfToken(response.data.csrfToken);
          } catch (error) {
            console.error('Error fetching CSRF token:', error);
          }
        };
    
        fetchCsrfToken();
    }, []);
    
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
            onFileUpload(event.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);

            setSelectedFileLocal(event.target.files[0])
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("trying to submit ")
        if (!selectedFileLocal) {
          setUploadStatus('No file selected.');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFileLocal);
    
        try {
          const response = await axios.post('http://localhost:8000/upload/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': csrfToken,
              'X-APIKEY': 'api_key',
              'X-username': 'user123'
            },
            withCredentials: true,
          });
          console.log('Response:', response.data);
          setUploadStatus('File uploaded successfully!');
        } catch (error: any) {
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Error request data:', error.request);
          } 
          console.error('Error message:', error.message);
          
          setUploadStatus('Error uploading file.');
        }
    };

    // mobile: default
    // sm:split screne Laptop
    // md: full screnn Laptop
    // lg:
    // sm:text-dark-1 md:text-white lg:text-primary-500 

    return (
      <div className='flex flex-col justify-between items-center'>
        <form
            onClick={handleFormClick} 
            className={`flex flex-col justify-center items-center border-2 border-dashed border-primary-500 w-full cursor-pointer 
            rounded-lg p-5 text-white h-screen-50 max-h-screen-50 sm:h-screen-25 md:h-screen-50 sm:max-h-screen-25 md:max-h-screen-50 relative ${image && 'bg-dark-4'}`}
            ref={formRef}
            onSubmit={handleSubmit}
        >
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
              alt={uploadStatus}
              layout="fill" 
              objectFit="contain"
              />
            : 
            <>
            <MdCloudUpload className="text-primary-500 w-20 h-20" />
            <p>Upload a prescription to get started</p>
            </>
          }
  
        </form>

        <div className="mt-4 flex justify-between items-center p-4 rounded-lg text-base font-medium text-white "> 
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