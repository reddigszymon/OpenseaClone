import React from 'react'
import {BsTwitter, BsYoutube} from 'react-icons/bs'
import {AiOutlineInstagram} from 'react-icons/ai'
import {FaDiscord, FaRedditAlien, FaTiktok} from 'react-icons/fa'


function Footer() {
  return (
    <div className="flex justify-center items-center h-full text-2xl sm:text-[28px] dark:bg-[rgb(32,34,37)] text-[rgb(138,147,155)] gap-[1em]">
        <BsTwitter className="cursor-pointer hover:text-black dark:hover:text-white"/>
        <AiOutlineInstagram className="cursor-pointer hover:text-black dark:hover:text-white"/>
        <FaDiscord className="cursor-pointer hover:text-black dark:hover:text-white"/>
        <FaRedditAlien className="cursor-pointer hover:text-black dark:hover:text-white"/>
        <BsYoutube className="cursor-pointer hover:text-black dark:hover:text-white"/>
        <FaTiktok className="cursor-pointer hover:text-black dark:hover:text-white"/>
    </div>
  )
}

export default Footer