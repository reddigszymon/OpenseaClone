import React from 'react'
import {MdOutlineLibraryBooks, MdOutlineAccountBalanceWallet, MdOutlineCreateNewFolder} from "react-icons/md"
import { CgProfile } from "react-icons/cg";
import {BsMoonFill} from "react-icons/bs"
import MobileNavItem from './MobileNavItem'
import ConnectButton from './ConnectButton'
import Footer from "./Footer"
import {BsCollection} from "react-icons/bs"
import Link from "next/link"
import {useAddress} from "@thirdweb-dev/react"



function Navbar({theme, setTheme, setWalletOpen}) {

    const address = useAddress()

const styles = {
    icon: `text-3xl mr-[.3em]`
}


  return (
    <>
        <div className="flex h-[83%] flex-col justify-between">
            <div>
                <Link href="/xd">
                    <MobileNavItem text="Collections" destination="/explore-collections" isLink={true}>
                        <BsCollection className={styles.icon}/>    
                    </MobileNavItem>
                </Link>
                <MobileNavItem text="Create" destination="/create" isLink={true}>
                    <MdOutlineCreateNewFolder className={styles.icon}/>    
                </MobileNavItem>
                {/* <MobileNavItem text="Resources" destination="/Resources" isLink={true}>
                    <MdOutlineLibraryBooks className={styles.icon}/>    
                </MobileNavItem> */}
                {address && 
                <div>
                    <MobileNavItem text="Account" destination={"/profile/" + address} isLink={true}>
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