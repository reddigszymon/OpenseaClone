import React from 'react'
import {BsTwitter, BsYoutube} from 'react-icons/bs'
import {AiOutlineInstagram} from 'react-icons/ai'
import {FaDiscord, FaRedditAlien, FaTiktok} from 'react-icons/fa'


function Footer() {
  return (
    <div className="flex justify-center items-center h-full text-2xl sm:text-[28px] dark:bg-[rgb(32,34,37)] text-[rgb(138,147,155)] gap-[1em]">
        <a href="https://twitter.com/opensea?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><BsTwitter className="cursor-pointer hover:text-black dark:hover:text-white"/></a>
        <a href="https://www.instagram.com/opensea/"><AiOutlineInstagram className="cursor-pointer hover:text-black dark:hover:text-white"/></a>
        <a href="https://discord.com/invite/opensea"><FaDiscord className="cursor-pointer hover:text-black dark:hover:text-white"/></a>
        <a href="https://www.reddit.com/r/opensea/"><FaRedditAlien className="cursor-pointer hover:text-black dark:hover:text-white"/></a>
        <a href="https://www.youtube.com/c/OpenSeaTV"><BsYoutube className="cursor-pointer hover:text-black dark:hover:text-white"/></a>
        <a href="https://www.tiktok.com/@opensea"><FaTiktok className="cursor-pointer hover:text-black dark:hover:text-white"/></a>
    </div>
  )
}

export default Footer