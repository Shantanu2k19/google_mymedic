import { User_info } from '@/types/user';
import React from 'react';
import { useEffect } from 'react';

interface Props {
    prop: User_info;
    edit: boolean;
}

function SettingsEditor({ prop, edit }: Props) {

    const { name, username, email, image, age, gender, created} = prop;

    const [newname, setNewname] = React.useState(name);
    const [newusernm, setNewusrnm] = React.useState(username);
    const [newemail, setNewemail] = React.useState(email);
    const [newgender, setNewgender] = React.useState(gender);
    const [neage, setNewage] = React.useState<number | undefined>(undefined);

    return (
        <>
            <form className="flex flex-col m-4 p-4 w-full md:w-2/3">

                <div className='flex flex-col md:flex-row w-full'>
                    <div className='flex flex-col w-full'>
                        <p className="setTit">Name</p>

                        <input
                        type="text"
                        placeholder= {name}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewname(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full md:ml-4'>
                        <p className="setTit">Username</p>

                        <input
                        type="text"
                        placeholder= {username}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewusrnm(e.target.value)}
                        />
                    </div>
                </div>

                <>
                    <p className="setTit">Email</p>

                    <input
                    type="text"
                    placeholder= {email}
                    className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                    disabled = {!edit}
                    onChange={(e) => setNewemail(e.target.value)}
                    />
                </>

                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col w-1/3'>
                        <p className="setTit">Age</p>

                        <input
                        type="number"
                        placeholder= {age !== undefined ? age.toString() : ''}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                        disabled = {!edit}
                        onChange={(e) => {
                            const value = e.target.value ? Number(e.target.value) : undefined;
                            setNewage(value);
                        }}
                        />
                    </div>
                    
                    <div className='flex flex-col w-1/3'>

                        <p className="setTit">Gender</p>

                        <select
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewgender(e.target.value)}
                        value={newgender}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-row w-full justify-around items-center'>
                    <button 
                        className={`button-custom2 w-32 ${ edit ? "bg-primary-500" : "bg-prim-hov pointer-events-none" }`}
                        disabled = {!edit}
                    >
                        Save
                    </button>

                    <button 
                        className={`button-custom2 w-32 ${ edit ? "bg-primary-500" : "bg-prim-hov pointer-events-none" }`}
                    >
                        Cancel
                    </button>
                </div>

            </form>

            <hr className='border border-dark-2 w-full md:w-2/3'/>
            <br/>

            <div className='flex flex-col md:flex-row w-full justify-around items-center w-full md:w-2/3'>
                <button className="button-custom w-64" >
                    Delete Account
                </button>

                <button className="button-custom w-64" >Erase Data</button>
            </div>
        </>
    )
}

export default SettingsEditor;