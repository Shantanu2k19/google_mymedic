"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/home/ProfileHeader";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from 'react';
import SettingsEditor from "@/components/home/settingsedit"


const Settings = () => {
  const { data: session, status } = useSession();

  const [name, setName] = useState('loading...');
  const [image, setImage] = useState('/assets/default_user.svg');
  const [username, setusername] = useState('loading...');
  const [bio, setBio] = useState('loading...');
  
  const [edit, setEdit] = useState(false);


  useEffect(() => {
    if (status === 'authenticated') {
    console.log('session', session);
        if (session.user) {
          setName(session.user.name || '');
          setImage(session.user.image || '');
          console.log('name-',name,'image-',image)
        }
    }
  }, [status]);
  
  return (
    <section className="text text-white">
      <ProfileHeader
        setEdit = {setEdit}
        name={name}
        username={username}
        imgUrl={image}
      />

      <SettingsEditor
        name="name" //{name}
        username="username" //{username}
        email="email@email.com"
        age="69"
        gender="male"
        edit = {edit}
      />

    </section>
  );
}
export default Settings;
