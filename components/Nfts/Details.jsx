import React, {useState} from 'react'
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import {ImBook} from "react-icons/im"
import { useRouter } from "next/router";


function Details() {

    const [showDetails, setShowDetails] = useState(false)
    const router = useRouter()
    const {isListed, collectionAddress, id} = router.query
  return (
    <>
        <div onClick={() => setShowDetails(prev => !prev)} className="flex items-center border-[1px] p-[20px] lg:p-[25px] mt-[5px] justify-between cursor-pointer">
            <div className="flex">
                <ImBook className="mr-[10px] text-[26px]"/>
                <p className="font-semibold lg:text-[18px]">Details</p>
            </div>
            <MdOutlineKeyboardArrowDown className="text-[26px] text-[rgba(0,0,0,0.5)]"/>
        </div>
        {showDetails && <div className="border-[1px] p-[20px] font-poppins bg-[#fbfdff] flex flex-col">
            <div className="flex justify-between items-center mb-[10px]">
                <p className="text-[14px] text-[rgba(0,0,0,0.6)]">Contract Address</p>
                <p className="text-[14px] font-medium text-[#2081e2]">{collectionAddress.slice(0,6) + "..." + collectionAddress.slice(38,42)}</p>
            </div>
            <div className="flex justify-between items-center mb-[10px]">
                <p className="text-[14px] text-[rgba(0,0,0,0.6)]">Token ID</p>
                <p className="text-[14px] font-medium text-[#2081e2]">{id}</p>
            </div>
            <div className="flex justify-between items-center mb-[10px]">
                <p className="text-[14px] text-[rgba(0,0,0,0.6)]">Token Standard</p>
                <p className="text-[14px] font-medium">ERC-721</p>
            </div>
            <div className="flex justify-between items-center mb-[10px]">
                <p className="text-[14px] text-[rgba(0,0,0,0.6)]">Blockchain</p>
                <p className="text-[14px] font-medium ">Etherum</p>
            </div>
            <div className="flex justify-between items-center mb-[10px]">
                <p className="text-[14px] text-[rgba(0,0,0,0.6)]">Metadata</p>
                <p className="text-[14px] font-medium text-[#2081e2]">Frozen</p>
            </div>
            <div className="flex justify-between items-center mb-[10px]">
                <p className="text-[14px] text-[rgba(0,0,0,0.6)]">Creator Earnings</p>
                <p className="text-[14px] font-medium">2.5%</p>
            </div>
        </div>}
    </>
  )
}

export default Details