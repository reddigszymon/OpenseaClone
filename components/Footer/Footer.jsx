import React from 'react'
import {BsTwitter, BsYoutube} from 'react-icons/bs'
import {AiOutlineInstagram} from 'react-icons/ai'
import {FaDiscord, FaRedditAlien, FaTiktok} from 'react-icons/fa'

const styles = {
    box: `cursor-pointer w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] rounded-lg hover:bg-[#7eacd9] dark:hover:bg-[#bec0c2] dark:bg-[#32373b] bg-[#2081e2] flex justify-center items-center`,
    icon: `text-white cursor-pointer dark:hover:text-white`,
}

function Footer() {
  return (
    <>
        <div className="flex justify-center items-center text-2xl sm:text-3xl bg-[#1868b7] dark:bg-[#1b1e21] gap-[.75em] h-[200px]">
            <div className={styles.box}><BsTwitter className={styles.icon}/></div>
            <div className={styles.box}><AiOutlineInstagram className={styles.icon}/></div>
            <div className={styles.box}><FaDiscord className={styles.icon}/></div>
            <div className={styles.box}><FaRedditAlien className={styles.icon}/></div>
            <div className={styles.box}><BsYoutube className={styles.icon}/></div>
            <div className={styles.box}><FaTiktok className={styles.icon}/></div>
        </div>
    </>
  )
}

export default Footer