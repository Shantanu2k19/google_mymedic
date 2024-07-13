import Link from "next/link";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

interface Props {
  name: string;
  username: string;
  imgUrl: string;
  type?: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileHeader({
  name,
  username,
  imgUrl,
  setEdit,
}: Props) {
  return (
    <div className='flex flex-col justify-start w-full md:w-2/3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='image'
              fill
              className='rounded-full object-cover shadow-2xl border border-primary-500'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
        <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'
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
      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;
