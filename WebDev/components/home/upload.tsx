import { useState,useEffect } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import axios from 'axios';
import '@/styles/upload.css'
import Image from 'next/image'

interface UploadComponentProps {
    onFileUpload: (file: File) => void;
    // setUploadStatus: React.Dispatch<React.SetStateAction<string>>;
  }

const Upload: React.FC<UploadComponentProps> = ({ onFileUpload }) => {
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    const [selectedFileLocal, setSelectedFileLocal] = useState<File | null>(null);
    const [csrfToken, setCsrfToken] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files && event.target.files[0];
        
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
            onFileUpload(event.target.files[0]);
            setSelectedFileLocal(event.target.files[0])
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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

    return (
      <div className='flex flex-col justify-between items-center'>
        <form
            className="flex flex-col justify-center items-center border-2 border-dashed border-primary-500 h-screens w-full cursor-pointer rounded-lg p-5 text-white"
            onSubmit={handleSubmit}
        >
          <input type="file" className='input-field' hidden
            onChange={handleFileChange} 
           />

          {image ?
           <Image
            src={image}
            alt={fileName}
            width={150}
            height={150}
            className='bg-black border rounded-md'
            />
          : 
          <>
          <MdCloudUpload className="text-primary-500 w-20 h-20" />
          <p>Upload a prescription to get started</p>
          </>
        }
  
        </form>
  
        <section className="m-4 flex justify-between items-center p-4 rounded-lg bg-light-2">
        {fileName} &nbsp;
          { image ? 
            <MdDelete
                className="text-primary-500 w-5 h-5" 
                onClick={() => {
                setFileName("No selected File")
                setImage(null)
                }}
            />
            :
            <AiFillFileImage  className="text-primary-500 w-5 h-5" />
          }
        </section>

        {uploadStatus && <div className="bg-white text-black border border-gray-300 px-4 py-2 text-lg cursor-pointer">{uploadStatus}</div>}

  
      </div>
    )
}

export default Upload