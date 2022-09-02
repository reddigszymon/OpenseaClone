import React, {useState} from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import {TbArrowsDownUp} from 'react-icons/tb'
import ActivityCard from './ActivityCard';

function ItemActivity() {
  const [showItemActivity, setShowItemActivity] = useState(false)

  return (
    <div>
      <div onClick={() => setShowItemActivity(prev => !prev)} className="flex items-center border-[1px] px-[20px] py-[20px] mt-[5px] justify-between cursor-pointer">
            <div className="flex">
                <TbArrowsDownUp className="mr-[10px] text-[24px]"/>
                <p className="font-semibold">Item Activity</p>
            </div>
            <MdOutlineKeyboardArrowDown className="text-[26px] text-[rgba(0,0,0,0.5)]"/>
      </div>
      {showItemActivity && <ScrollMenu>
        <ActivityCard />
      </ScrollMenu>}
    </div>
  )
}

export default ItemActivity