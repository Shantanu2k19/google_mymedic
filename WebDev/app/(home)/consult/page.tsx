"use client"
import { Triangle } from 'react-loader-spinner'

export default function hello(){

    return (
        <div className='flex flex-col justify-center items-center text-white text-'>
            <Triangle
                visible={true}
                height="200"
                width="200"
                color="#877EFF"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />

            <span>
                Coming soon...
            </span>
        </div>
    )
}