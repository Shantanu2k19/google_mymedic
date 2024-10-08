'use client'
import React, { useMemo } from 'react'

import { sidebarLinks } from '@/types/sidebarLinks'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Bottombar () {
    const pathname = usePathname()
    // console.log('current pathname-', pathname)
    
    return (
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map((link) => {
                // if link is connectly active
                const isActive =
                (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route
                // console.log(link.route, isActive);
                return (
                <Link
                    href={link.route}
                    key={link.label}
                    className=
                    {`bottombar_link ${isActive && 'bg-accent'}`}
                >
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={24}
                        height={24}
                    />

                    <p className="text-subtle-medium text-light-1
                    max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
                </Link>
                )
            })}
            </div>
        </section>
    )
}

export default Bottombar
