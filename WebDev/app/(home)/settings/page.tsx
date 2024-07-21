"use client"
import ProfileHeader from "@/components/home/ProfileHeader";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from 'react';
import SettingsEditor from "@/components/home/settingsedit"
import { User_info } from "@/types/user"
// import { fetchUserInfo } from "@/lib/actions/userSettingAction"
import { fetchUserInfo } from "@/app/api/actions/userSettingAction"
import { useTheme } from "next-themes";
import { toast } from 'react-toastify';

const Settings = () => {
  const { data: session, status } = useSession();
  const [ user_info, setUserInfo] = useState<User_info>();
  const [ edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchData = async (email:string) => {
      console.log("fetching setData")
      try {
        const response: User_info = await fetchUserInfo(email);
        console.log(response);
        setUserInfo(response);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (status === 'authenticated' && session.user && session.user.email) 
      fetchData(session.user.email);
  },[status]);

  function showAlert(mssg: string, mode:number) {
      console.log("alert", mssg, mode)
  
      if (mode == 1) {
        toast.success(mssg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (mode == 2) {
        toast.info(mssg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(mssg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  }

  return (
    <section className="text text-white">
       {user_info ? (
        <>
          <ProfileHeader
            prop = {user_info}
            setEdit = {setEdit}
            edit = {edit}
            showAlert = {showAlert}
          />

          <SettingsEditor
            prop = {user_info}
            edit = {edit}
            setEdit = {setEdit}
            showAlert = {showAlert}
          />
        </>

      ) : (
        <p>Loading user's information...</p>
      )}
    </section>
  );
}
export default Settings;
