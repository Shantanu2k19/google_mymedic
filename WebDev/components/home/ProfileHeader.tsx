import Image from "next/image";
import { User_info } from "@/types/user"

interface Props {
  prop: User_info;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  showAlert: (mssg: string, mode: number) => void;
}

function ProfileHeader({
  prop,
  setEdit,
  edit,
  showAlert,
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
              className='rounded-full object-cover shadow-2xl border-2 border-accent p-2 cursor-pointer'
              onClick={() => showAlert("Cannot edit currently.", 2)}
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {prop.name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{prop.username}</p>
          </div>
        </div>

        <div className={`flex cursor-pointer gap-3 rounded-lg px-4 py-2 border border-accent ${edit ? "bg-dark-4": "bg-dark-3"}`}
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
        <p className='text-base-medium text-gray-1 mt-2'>User Created on: {prop.created}</p>
      </div>

      <div className='mt-8 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;
