import React from 'react'
import {TbArrowsLeftRight} from 'react-icons/tb'

function TransferDiv({price, from, to, date}) {
  return (
    <div className="flex items-center border-[1px] p-[20px]">
            <div className="flex items-center w-[106px] lg:w-[121.6px]">
              <TbArrowsLeftRight className="mr-[8px]"/>
              <p className="font-poppins text-[14px]">Transfer</p>
            </div>
            <div className="flex items-center w-[106px] lg:w-[121.6px]">
              <img className="w-[16px] h-[16px] mr-[5px]" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
              <p>{price}</p>
            </div>
            <div className="flex items-center w-[106px] lg:w-[121.6px]">
              <p className="text-[#2081e2] text-[14px] font-poppins cursor-pointer">{from}</p>
            </div>
            <div className="flex items-center w-[106px] lg:w-[121.6px]">
              <p className="text-[#2081e2] text-[14px] font-poppins cursor-pointer">{to}</p>
            </div>
            <div className="flex items-center w-[106px] lg:w-[121.6px]">
              <p className="text-[#2081e2] text-[14px] font-poppins cursor-pointer">{date}</p>
            </div>
    </div>
  )
}

export default TransferDiv