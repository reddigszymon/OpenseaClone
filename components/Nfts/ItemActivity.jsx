import React, {useState} from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md"
import {TbArrowsDownUp} from 'react-icons/tb'
import ActivityCard from './ActivityCard';

function ItemActivity() {
  const [showItemActivity, setShowItemActivity] = useState(false)

  return (
    <div>
      <div onClick={() => setShowItemActivity(prev => !prev)} className="dark:bg-[#262b2f] dark:text-[#d3d5d7] dark:border-0 flex items-center border-[1px] px-[20px] py-[20px] mt-[5px] justify-between cursor-pointer">
            <div className="flex">
                <TbArrowsDownUp className="mr-[10px] text-[24px]"/>
                <p className="font-semibold">Item Activity</p>
            </div>
            {!showItemActivity && <MdOutlineKeyboardArrowDown className="text-[26px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]"/>}
            {showItemActivity && <MdOutlineKeyboardArrowUp className="text-[26px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]"/>}
      </div>
      {showItemActivity && <ScrollMenu>
        <ActivityCard />
      </ScrollMenu>}
    </div>
  )
}

export default ItemActivity