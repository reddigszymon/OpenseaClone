import React, {useState} from 'react'
import {MdOutlineSubject, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md"

function NftDescription({collectionAvatar}) {

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
            <img src={collectionAvatar} className="w-[80px] h-[80px] float-left"/>
            <p className="text-justify text-[14px]">The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.</p>
        </div>}
    </>
  )
}

export default NftDescription