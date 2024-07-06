"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useState } from "react";

function Topbar () {
  const { data: session, status } = useSession();
  const router = useRouter()

  const [name, setName] = useState('');
  const [image, setImage] = useState('/assets/icon.png');

  useEffect(() => {
    if (status === 'loading') {
        console.log('loading...');
        return;
      }
  
    if (status === 'authenticated') {
    console.log('session', session);
        if (session.user) {
            setName(session.user.name || '');
            setImage(session.user.image || '');
        }
    }

    if (status === 'unauthenticated') {
      console.log("redirecting to home")
      router.push('/');
    }
  }, [status, router]);
  
  return (
    <nav className="topbar">
        <Link href='/' className="flex item-center gap-4">
            <Image src="/assets/icon.png" alt="logo" width={40} height={20} />
            <p className="text-heading3-bold text-light-1 max-xs:hidden ">
                MyMedic
            </p>
        </Link>

        <div className="flex items-center gap-1">
            <div className="block">
                <div className="flex cursor-pointer">
                    {session?.user?.name && <Link 
                        href={'/settings'} 
                        className="flex items-center text-white bg-white bg-opacity-10 rounded-full p-2 px-4" >
                        <Image src={image}
                            alt="logout"
                            width={20}
                            height={20}
                        ></Image>
                        <span className="pl-3">{session.user.name}</span>
                    </Link>}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Topbar
