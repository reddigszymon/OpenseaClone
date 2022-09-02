import React from 'react'
import {IoIosArrowForward} from "react-icons/io"
import ToggleButton from "./ToggleButton"
import Link from 'next/link'

const styles = {
    navbarItem: `cursor-pointer text-[#04111DBF] dark:text-[#cbcccd] font-semibold flex justify-between items-center p-[2px] py-[20px] px-[10px]`,
    navbarItemLeft: `flex justify-center items-center`
}

function MobileNavItem({children, text, theme, setTheme, destination, isLink}) {
  return (
    <>
      {isLink && <Link href={`${destination}`}>
        <div className={styles.navbarItem}>
        <div className={styles.navbarItemLeft}>
            {children}
            <div className="text-lg">{text}</div>
        </div>
        {text == "Night Mode" ? <ToggleButton theme={theme} setTheme={setTheme}/> : <IoIosArrowForward className="text-xl cursor-pointer"/>}
      </div>
      </Link>}
      {!isLink &&
        <div className={styles.navbarItem}>
        <div className={styles.navbarItemLeft}>
            {children}
            <div className="text-lg">{text}</div>
        </div>
        {text == "Night Mode" ? <ToggleButton theme={theme} setTheme={setTheme}/> : <IoIosArrowForward className="text-xl cursor-pointer"/>}
      </div>}
    </>
    
    
  )
}

export default MobileNavItem

