import Link from "next/link";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { User_info } from "@/types/user"

interface Props {
  prop: User_info;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileHeader({
  prop,
  setEdit,
}: Props) {
  return (
    <div className='flex flex-col justify-start w-full md:w-2/3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={prop.image}
              alt='image'
              fill
              className='rounded-full object-cover shadow-2xl border-2 border-primary-500 p-2'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {prop.name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{prop.username}</p>
          </div>
        </div>

        <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2 border border-primary-500'
        onClick={()=> setEdit(prevState => !prevState)}
        >
          <Image
            src='/assets/edit.svg'
            alt='edit'
            width={20}
            height={20}
          />
          <p className='text-light-2 max-sm:hidden'>Edit</p>
        </div>

      </div>

      <div>
        <p className='text-base-medium text-gray-1 m-2'>User Created on: {prop.created}</p>
      </div>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;
