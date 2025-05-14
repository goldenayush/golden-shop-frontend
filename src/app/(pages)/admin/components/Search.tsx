"use client"
import React, { useState, useEffect, useRef } from 'react'
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Search() {
    const [show, setShow] = useState(false)
    const wrapperRef = useRef<any>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className='w-[300px] md:w-[500px] lg:w-[552px] relative'>
            <div className='flex items-center gap-3 bg-[#f1f2f3] px-3 rounded-[4px]'>
                <FiSearch />
                <input
                    type="text"
                    placeholder='Search'
                    className='px-1 text-[14px] placeholder:text-[14px] w-full py-2 outline-none'
                    onChange={()=>{
                        setShow(true)
                    }}
                />
            </div>
            {/* result container */}
            {show && (
                <div className='bg-[#202123] p-[20px] absolute w-[300px] md:w-[500px] lg:w-[552px] mt-4 rounded-[4px]'>
                    {/* result */}
                    <div className='h-[250px] overflow-y-auto text-[#999fa4]'>
                         {/* loading... */}
                         <div className='py-6'>
                          <AiOutlineLoading3Quarters size={30} color='#999fa4' className='spin mx-auto' />
                        </div>
                        {/* search txt */}
                        <h3 className='text-white text-[26px]'>Results for "at"</h3>
                        {/* not found */}
                        <span className='text-[14px] uppercase text-center block'>TRY OTHER RESOURCES</span>
                         {/* result */}
                        <div className='text-[#999fa4]'>
                            <span className='text-[14px] uppercase block my-2'>Products</span>
                            <ul>
                                <li className='px-3 py-[3px] hover:bg-[#2f3133] rounded-sm cursor-pointer mt-1'>
                                    <span className='text-[14px] font-semibold'>choker mala for laddu gopal</span>
                                    <span className='text-[14px] block'>#C-12</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
