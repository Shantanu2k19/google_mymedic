import { useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import '@/styles/upload.css'
import Image from 'next/image'
function Upload() {
  
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    return (
      <div className='flex flex-col justify-between items-center'>
        <form
            className="flex flex-col justify-center items-center border-2 border-dashed border-primary-500 h-screens w-full cursor-pointer rounded-lg p-5 text-white"
        // onClick={() => document.querySelector(".input-field").click()}
        >
          <input type="file" accept='image/*' className='input-field' hidden 
        //   onChange={({ target: {files}}) => {
        //     files[0] && setFileName(files[0].name)
        //     if(files){
        //       setImage(URL.createObjectURL(files[0]))
        //     }
        //   }}
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
  
      </div>
    )
}

export default Upload