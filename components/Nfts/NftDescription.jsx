import React, {useState} from 'react'
import {MdOutlineSubject, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md"

function NftDescription({collectionAvatar, description}) {

    const [showDescription, setShowDescription] = useState(false)
  return (
    <>
        <div onClick={() => setShowDescription(prev => !prev)} className="dark:text-[#d3d5d7] dark:bg-[#262b2f] dark:border-0 flex items-center border-[1px] p-[20px] lg:p-[25px] mt-[5px] justify-between cursor-pointer">
            <div className="flex">
                <MdOutlineSubject className="mr-[10px] text-[26px]"/>
                <p className="font-semibold lg:text-[18px]">Description</p>
            </div>
            {!showDescription && <MdOutlineKeyboardArrowDown className="text-[26px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]"/>}
            {showDescription && <MdOutlineKeyboardArrowUp className="text-[26px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]"/>}
        </div>
        {showDescription && <div className="dark:border-0 border-[1px] p-[20px] font-poppins bg-[#fbfdff] dark:bg-[#262b2f] ">
            <img src={collectionAvatar} className="w-[80px] h-[80px] float-left rounded-full p-[5px]"/>
            <p className="text-justify text-[14px]">{description}</p>
        </div>}
    </>
  )
}

export default NftDescription