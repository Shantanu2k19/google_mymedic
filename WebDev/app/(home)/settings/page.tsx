"use client"
import ProfileHeader from "@/components/home/ProfileHeader";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from 'react';
import SettingsEditor from "@/components/home/settingsedit"
import { User_info } from "@/types/user"
import { fetchUserInfo } from "@/lib/actions/userSettingAction"

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


  return (
    <section className="text text-white">
       {user_info ? (
        <>
          <ProfileHeader
            prop = {user_info}
            setEdit = {setEdit}
          />

          <SettingsEditor
            prop = {user_info}
            edit = {edit}
          />
        </>

      ) : (
        <p>Loading user information...</p>
      )}
    </section>
  );
}
export default Settings;
