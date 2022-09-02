import React, { startTransition } from 'react'
import heroPicture from "../../assets/heroPicture.jpg"
import heroAuthor from "../../assets/heroAuthor.jpg"
import Image from 'next/image'
import Link from 'next/link'
import {HiOutlineInformationCircle} from "react-icons/hi"
import LearnMore from './LearnMore'

function Hero() {
    const styles = {
        wrapper: `relative`,
        container: ` lg:mx-auto lg:max-w-[1200px] lg:px-8 lg:py-20 lg:flex lg:items-center lg:justify-between before:content-[''] before:bg-red-500 before:bg-hero-pattern before:dark:bg-hero-pattern-dark before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0  before:bg-cover before:bg-center before:opacity-60 before:blur`,
        mainTitle: `mx-[.75em] sm:mx-0 relative font-poppins pt-[1em] mb-[.5em] text-[28px] md:text-3xl lg:text-4xl 2xl:text-[45px] lg:tracking-normal font-semibold text-center lg:text-start`,
        subTitle: `px-[20px] sm:px-0 max-w-[390px] lg:max-w-[800px] mx-auto tracking-wider relative text-center text-lg md:text-xl lg:text-start lg:text-2xl 2xl:text-[24px] text-[#353840] dark:text-[#8A939B]`,
        buttonContainer: `mt-[1em] mb-[3em] relative flex gap-6 items-center justify-center lg:justify-start`,
        buttonExplore: `relative bg-[#2081e2] hover:bg-[#3691ed] px-8 py-4 lg:px-12 rounded-md font-bold text-white`,
        buttonCreate: `relative bg-[#ffff] px-[36.1px] py-4 dark:hover:bg-[#3d3f46] lg:px-[52.1px] rounded-md font-bold text-[#2081e2] dark:text-white dark:bg-[#353840]`,
        cardContainer: ` mb-[2em] lg:mb-0 shadow-xl relative max-w-[355px] max-h-[338px] sm:max-w-[400px] sm:max-h-[390px] lg:w-[480px] lg:max-h-[432px] rounded-md overflow-hidden mx-auto lg:mx-0 lg:ml-[20px]`,
        image: `cursor-pointer relative w-full min-h-[200px] max-h-[266px] sm:min-h-[280px] lg:h-[360px] overflow-hidden rounded-t-lg`,
        imageInfo: `relative h-[72px] w-full dark:bg-[#353840] bg-white flex items-center rounded-b-lg`,
        authorAvatar: `cursor-pointer relative h-[40px] w-[40px] overflow-hidden rounded-full m-4`,
        collectionName: `relative text-sm font-semibold`,
        collectionAuthor: `relative text-[#2081e2] font-semibold text-sm`,
        authorInfo: `relative cursor-pointer ml-auto mr-[1em] text-2xl dark:text-[#8A939B]`,
        
    }
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className='lg:flex-col lg:items-start'>
                <div className={styles.mainTitle}>Discover, collect, and sell extraordinary<br/> NFTs</div>
                <div className={styles.subTitle}>OpenSea is the world's first and largest NFT marketplace</div>
                <div className={styles.buttonContainer}>
                    <button className={styles.buttonExplore}>Explore</button>
                    <button className={styles.buttonCreate}>Create</button>
                </div>
                <div className="hidden lg:block ">
                    <LearnMore />
                </div>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.image}>
                    <Image layout='fill' objectFit='cover' src={heroPicture} />
                </div>
                <div className={styles.imageInfo}>
                    <div className={styles.authorAvatar}>
                        <Image layout='fill' objectFit='cover' src={heroAuthor} />
                    </div>
                    <div className="relative">
                        <p className={styles.collectionName}>xookt 1/1</p>
                        <a className={styles.collectionAuthor} href="https://opensea.io/assets/ethereum/0xabab5e32166872605b371aeb0601a6d024ba47c5/1">Nic_Hamilton</a>
                    </div>
                    <HiOutlineInformationCircle className={styles.authorInfo}/>
                </div>
            </div>
        </div>
        <div className="lg:hidden relative">
            <LearnMore />
        </div>
    </div>
    
  )
}

export default Hero