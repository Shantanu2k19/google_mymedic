import React from 'react';
import { useEffect } from 'react';

interface Props {
    name: string;
    username: string;
    email: string;
    age: string;
    gender: string;
    edit: boolean;
  }
  

function SettingsEditor({
    name,
    username,
    email,
    gender,
    edit,
    age,
  }: Props) {

    const [newname, setNewname] = React.useState(name);
    const [newusernm, setNewusrnm] = React.useState(username);
    const [newemail, setNewemail] = React.useState(email);
    const [newgender, setNewgender] = React.useState(gender);
    const [neage, setNewage] = React.useState(age);

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
                        placeholder= {age}
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewage(e.target.value)}
                        />
                    </div>
                    
                    <div className='flex flex-col w-1/3'>

                        <p className="setTit">Gender</p>

                        <select
                        className={`setInp border ${edit ? "border-light-5 bg-dark-4" : "border-gray-2 bg-dark-2"}`}
                        disabled = {!edit}
                        onChange={(e) => setNewgender(e.target.value)}
                        >
                            <option value="Male" selected={gender === "male"}>Male</option>
                            <option value="Female" selected={gender === "female"}>Female</option>
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