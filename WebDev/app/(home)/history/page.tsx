"use client"
import { useCollapse } from 'react-collapsed'
import Image from 'next/image'

export default function hello(){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    return (
        <>
        <div className="border border-red-200 text-white ">
        <button {...getToggleProps()}>
            {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        <section {...getCollapseProps()}>
            Collapsed content 
            <Image
                src="/icons/ai3.png"
                alt="logout"
                width={200}
                height={400}
            />
        </section>
        </div>
        </>
    )
}