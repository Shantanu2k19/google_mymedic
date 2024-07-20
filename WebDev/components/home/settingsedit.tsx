import { User_info } from '@/types/user';
import React from 'react';
import Modal from "@/components/shared/modal"
import { useEffect } from 'react';
import { updateUserDetails } from "@/app/api/actions/userSettingAction"
import { UserUpdate } from "@/models/user";

interface Props {
    prop: User_info;
    edit: boolean;  
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    showAlert: (mssg: string, mode: number) => void;
}

function SettingsEditor({ prop, edit, setEdit, showAlert }: Props) {
   
    const { name, username, email, image, age, gender, created} = prop;

    const [newname, setNewname] = React.useState(name);
    const [newusernm, setNewusrnm] = React.useState(username);
    const [newgender, setNewgender] = React.useState(gender);
    const [newage, setNewage] = React.useState<Number>();

    const updateFormValues = (m_name:string, m_usrname:string, m_gender:string, m_age:Number) =>{
        setNewname(m_name);
        setNewusrnm(m_usrname);
        setNewgender(m_gender);
        setNewage(m_age);
    }

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDeleteAccount = () => {
        console.log("yes selected")
        showAlert("Coming soon", 2);
        setIsModalOpen(false);
    }

    const cancelUpdate = () => {
        setEdit(prevState => !prevState);
        updateFormValues(name, username, gender, age);
    }

    const updateDetails = async () => {
        try {
          const newData: UserUpdate = {
            name: newname,
            username: newusernm,
            age: newage,
            gender: newgender,
          };
      
          const updatedUser = await updateUserDetails(email, newData);
          console.log('User updated successfully:', updatedUser);
          setEdit(false);
          showAlert("Details Updated",1);
        } catch (error) {
          console.error('Error updating user:', error);
          alert('There was an error updating the user. Please try again.');
          setEdit(false);
        }
      };
      

    useEffect(() => {
        updateFormValues(name, username, gender, age);
    }, [])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='flex flex-col justify-center items-center m-2 mx-10 text-center'>
                    <p className='text-heading4-medium m-2 mb-4'>Do you want Delete your account?</p> 
                    <p>This action is permanent and cannot be undone. All your data will be lost.</p>
                    <br/>

                    <div className='flex flex-row'>
                        <button 
                            className="button-custom w-32"
                            onClick={handleDeleteAccount}>Confirm
                        </button>
                        <button 
                            className="button-custom w-32"
                            onClick={closeModal}>Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <form className="flex flex-col m-4 p-4 w-full md:w-2/3">

                <div className='flex flex-col md:flex-row w-full'>
                    <div className='flex flex-col w-full'>
                        <p className="setTit">Name</p>

                        <input
                        type="text"
                        placeholder= {newname}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4 text-white" : "border-gray-2 bg-dark-2 text-gray-3"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewname(e.target.value)}
                        value={newname}
                        />
                    </div>

                    <div className='flex flex-col w-full md:ml-4'>
                        <p className="setTit">Username</p>

                        <input
                        type="text"
                        placeholder= {newusernm}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4 text-white" : "border-gray-2 bg-dark-2 text-gray-3"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewusrnm(e.target.value)}
                        value={newusernm}
                        />
                    </div>
                </div>

                <>
                    <p className="setTit">Email</p>

                    <input
                    type="text"
                    placeholder= {email}
                    className={`setInp border border-gray-2 bg-dark-2 text-gray-3`}
                    disabled
                    />
                </>

                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col w-1/3'>
                        <p className="setTit">Age</p>

                        <input
                        type="number"
                        placeholder= {newage !== undefined ? newage.toString() : ''}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4 text-white" : "border-gray-2 bg-dark-2 text-gray-3"}`}
                        disabled = {!edit}
                        onChange={(e) => {
                            const value = e.target.value ? Number(e.target.value) : undefined;
                            setNewage(value);
                        }}
                        value={newage !== undefined ? newage.toString() : ''}
                        />
                    </div>
                    
                    <div className='flex flex-col w-1/3'>

                        <p className="setTit">Gender</p>

                        <select
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4 text-white" : "border-gray-2 bg-dark-2 text-gray-3"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewgender(e.target.value)}
                        value={newgender}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Female">Others</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-row w-full justify-around items-center'>
                    <button 
                        // type="button"
                        className={`button-custom2 w-32 font-bold text-light-3 ${ edit ? "bg-primary-500 text-white" : "bg-prim-hov pointer-events-none" }`}
                        disabled = {!edit}
                        onClick={updateDetails}
                    >
                        Update
                    </button>

                    <button 
                        type="button"
                        className={`button-custom2 w-32 font-bold text-light-3 ${ edit ? "bg-primary-500 text-white" : "bg-prim-hov pointer-events-none" }`}
                        onClick={cancelUpdate}
                        >
                        Cancel
                    </button>
                </div>

            </form>

            <hr className='border border-dark-2 w-full md:w-2/3'/>
            <br/>

            <div className='flex flex-col md:flex-row w-full justify-around items-center w-full md:w-2/3'>
                <button 
                    className="button-custom w-64" 
                    onClick={openModal}
                >
                    Delete Account
                </button>

                {/* <button className="button-custom w-64" >Erase Data</button> */}
            </div>
        </>
    )
}

export default SettingsEditor;