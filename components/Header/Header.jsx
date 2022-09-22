import React from 'react'
import {useState} from 'react'
import openseaLogo from "../../assets/opensea.png"
import greenCircle from "../../assets/greenCircle.png"
import Image from "next/image"
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import {GiHamburgerMenu} from "react-icons/gi"
import {FaTimes} from "react-icons/fa"
import Navbar from './Navbar'
import SmallSearch from "./SmallSearch"
import MoonIcon from './MoonIcon'
import WalletBalance from "./WalletBalance"
import Link from "next/link"
import Router from 'next/router'
import { useTheme  } from "next-themes";
import {useAddress, useMetamask} from "@thirdweb-dev/react"
import BigSearch from "./BigSearch"

function Header({titles, fullData, etherPrice}) {

    const [navbarOpen, setNavbarOpen] = useState(false)
    const [smallSearch, setSmallSearch] = useState(false)
    const [walletOpen, setWalletOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    const styles = {
        wrapper: `shadow-lg w-full bg-white dark:bg-[#04111d] px-[1.2rem] py-[16px] flex`,
        logo: `flex justify-center items-center cursor-pointer`,
        logoText: `text-black dark:text-white font-bold text-2xl ml-[.6em] mr-[1em] `,
        icons: `sm:flex-1 text-white text-3xl flex items-center justify-center ml-auto cursor-pointer`,
        largeText: `2xl:ml-[2.5em] 2xl:text-[3xl] ml-[20px] text-black dark:text-[#aab0b5] hover:text-[#8a939b] dark:hover:text-white`,
        navbarContainer: `xl:max-w-[800px] xl:ml-auto w-full hidden sm:flex items-center justify-center border-2 dark:border-0 bg-white dark:bg-[#2b2a33] rounded-lg dark:hover:bg-[#4c505c]`,
        searchIconSpace: `text-2xl mx-3`,
        searchIconColor: `text-[#8a939b]`,
        input: `outline-none lg:max-w-[1000px] rounded-lg text-black dark:text-white flex-1 dark:bg-[#2b2a33] text-base p-2 outline-0 dark:hover:bg-[#4c505c]`,
        bigScreenNavbar: `hidden xl:flex xl:items-center xl:ml-auto ml-[.5em] text-base 2xl:text-lg 2xl:mr-[.5em] font-bold`,
        bigScreenIcons: `hidden lg:flex ml-[.5em] `,
        greenCircle: `2xl:ml-[.75em] h-[32px] w-[32px] relative rounded-full mr-[20px] ml-[10px] overflow-hidden`,
        bigScreenProfile: `mr-[15px] ml-[15px] text-black dark:text-[#8a939b] hover:text-[#8a939b] dark:hover:text-white text-[32px]`,
        bigScreenSearchIcon: `sm:hidden mr-[.5em]  text-black dark:text-[#8a939b]`,
        bigScreenHidden: `xl:hidden`,
        navbarClosed: `text-black ml-[.5em] text-3xl dark:text-[#8a939b]`,
        navbarOpen: `ml-[.5em] text-black dark:text-[#8a939b]`,
        walletNoConnection: `text-[32px] text-[black] 2xl:ml-[.5em] 2xl:mr-[15px]  dark:text-[#8a939b] hover:text-[#8a939b] dark:hover:text-white`,
        navbarStyling: `z-30 border-y-2 dark:border-0 fixed w-full lg:w-[50%] h-screen bg-[#fbfdff] dark:bg-[#303339] transition-all ${navbarOpen ? "translate-x-[0]" : "translate-x-[100%]"} ${navbarOpen ? "lg:translate-x-[100%]" : "lg:translate-x-[200%]"} xl:translate-x-[200%]`,
        walletStyling: `z-40 bg-white fixed w-full lg:w-[50%] h-screen transition-all ease-in duration-300 dark:bg-[rgb(32,34,37)] ${walletOpen ? "translate-x-[0]" : "translate-x-[100%]"} ${walletOpen ? "lg:translate-x-[100%]" : "lg:translate-x-[200%]"}`
    }


    const address = useAddress()
    const connectWallet = useMetamask()


    if (typeof window !== "undefined") {

        navbarOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
    
        if (document.body.clientWidth >= 1280) {
            document.body.style.overflow = "visible"
        }
    }

  return (
    <>
    <div className={styles.wrapper}>
        <div onClick={() => Router.push({pathname: '/'})} className={styles.logo}>
            <Image src={openseaLogo} height={40} width={40}></Image>
            <div className={styles.logoText}>OpenSea</div>
        </div>
        <div className={styles.icons}>
            <div className={styles.navbarContainer}>
                <div className={styles.searchIconSpace}>
                    <AiOutlineSearch className={styles.searchIconColor}/>
                </div>
                <BigSearch titles={titles} fullData={fullData}/>
            </div>
            <div className={styles.bigScreenNavbar}>
                <Link href='/explore-collections'><span className={styles.largeText}>Collections</span></Link>
                <a href="https://opensea.io/learn"><div className={styles.largeText}>Resources</div></a>
                <div onClick={() => Router.push({pathname: '/create'})} className={styles.largeText}>Create</div>
                <MoonIcon theme={theme} setTheme={setTheme}/>
            </div>
            <div className={styles.bigScreenIcons}>
                {
                address ?
                <Link href={"/profile/" + address}> 
                    <div className={styles.greenCircle}>
                        <Image layout='fill' objectFit='cover' src={greenCircle}/>
                    </div> 
                </Link>
                : 
                <CgProfile onClick={address ? undefined : () => connectWallet('injected')} className={styles.bigScreenProfile}/>
                }
                <MdOutlineAccountBalanceWallet onClick={address ? () => setWalletOpen(prev => !prev) : () => connectWallet('injected')} className={styles.walletNoConnection}/>
            </div>
                <AiOutlineSearch className={styles.bigScreenSearchIcon} onClick={() => setSmallSearch(prev => !prev)}/>
                {smallSearch && <SmallSearch setSmallSearch={setSmallSearch} titles={titles} fullData={fullData}/>}
            <div className={styles.bigScreenHidden} onClick={() => setNavbarOpen(prev => !prev)}>
                {
                navbarOpen? 
                <FaTimes className={styles.navbarClosed}/>
                : 
                <GiHamburgerMenu className={styles.navbarOpen} />
                }
            </div>
        </div>
    </div>
    <div className={styles.navbarStyling}>
        {!walletOpen && <Navbar theme={theme} setTheme={setTheme} walletOpen={walletOpen} setWalletOpen={setWalletOpen}/>}
    </div>
    <div className={styles.walletStyling}>
        {walletOpen && <WalletBalance etherPrice={etherPrice} walletOpen={walletOpen} setWalletOpen={setWalletOpen}/>}
    </div>
    </>
  )
}

export default Header