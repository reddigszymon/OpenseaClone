import React from 'react'
import {FaRegCompass, FaTimes} from "react-icons/fa"
import {RiBarChart2Fill} from "react-icons/ri"
import {MdOutlineLibraryBooks, MdOutlineAccountBalanceWallet} from "react-icons/md"
import { CgProfile } from "react-icons/cg";
import {BsMoonFill} from "react-icons/bs"
import MobileNavItem from './MobileNavItem'
import ConnectButton from './ConnectButton'
import Footer from "./Footer"
import {useWeb3} from "@3rdweb/hooks"
import {BsCollection} from "react-icons/bs"
import Link from "next/link"



function Navbar({theme, setTheme, setWalletOpen}) {

    const {address} = useWeb3()


const styles = {
    icon: `text-3xl mr-[.3em]`
}


  return (
    <>
        <div className="flex h-[83%] flex-col justify-between">
            <div>
                <Link href="/xd">
                    <MobileNavItem text="Collections" destination="/collections/0xa9d524c82a5e5530AE26Ae194f8caCE75C8097F4" isLink={true}>
                        <BsCollection className={styles.icon}/>    
                    </MobileNavItem>
                </Link>
                <MobileNavItem text="Stats" destination="/stats" isLink={true}>
                    <RiBarChart2Fill className={styles.icon}/>    
                </MobileNavItem>
                <MobileNavItem text="Resources" destination="/Resources" isLink={true}>
                    <MdOutlineLibraryBooks className={styles.icon}/>    
                </MobileNavItem>
                {address && 
                <div>
                    <MobileNavItem text="Account" destination="/account" isLink={true}>
                        <CgProfile className={styles.icon} />
                    </MobileNavItem>
                    <MobileNavItem text="My Wallet" isLink={false}>
                        <MdOutlineAccountBalanceWallet className={styles.icon} onClick={() => setWalletOpen(true)} />
                    </MobileNavItem>
                </div>
                }
                <MobileNavItem text="Night Mode" theme={theme} setTheme={setTheme} isLink={false}>
                    <BsMoonFill className={styles.icon}/>    
                </MobileNavItem>
            </div>
            <div>
                <ConnectButton />
                <Footer />
            </div>
            
        </div>
    </>
  )
}

export default Navbar