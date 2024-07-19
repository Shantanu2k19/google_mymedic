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
    const fetchData = async (username:string) => {
      try {
        const response = await fetchUserInfo(username);
        console.log(response);
        console.log("type-", typeof response);


        // const responseJson = JSON.parse(response.ret);
        // console.log('response-->', responseJson);

        // let tempData: User_info = responseJson.map((item: ApiResponse) => ({
        //   prescriptions: item.data_from_llm.medData.prescriptions,
        //   extra_info: item.data_from_llm.medData.extra_info,
        //   image_url: item.img_url,
        //   upload_date: item.upload_date,
        //   verification: item.verification,
        //   verification_doc_name: item.verification_doc_name,
        //   verification_date: item.verification_date,
        //   verification_comment: item.verification_comment,
        // }));

        // setUserInfo(tempData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // if (status === 'authenticated' && session.user && session.user.name) 
    //   fetchData(session.user.name);
  },[status]);


  return (
    <section className="text text-white">
      {/* <ProfileHeader
        setEdit = {setEdit}
        name={name}
        username={username}
        imgUrl={image}
      />

      <SettingsEditor
        name="name"
        username="username"
        email="email@email.com"
        age="69"
        gender="male"
        edit = {edit}
      /> */}
  yooo
    </section>
  );
}
export default Settings;
