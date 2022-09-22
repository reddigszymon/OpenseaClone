import React from 'react'
import {BsX} from "react-icons/bs"
import wallet from "../../assets/wallet.png"
import Image from 'next/image'
import {AiOutlineArrowDown, AiOutlineInfoCircle} from 'react-icons/ai'
import {useState} from "react"

function AddFundsComponent({setShowAddFunds, address}) {
    const [showCopied, setShowCopied] = useState(false)

    function handleCopy() {
        navigator.clipboard.writeText(address)
        setShowCopied(true)
    }

    setTimeout(() => {
        setShowCopied(false)
    }, 1000)

  return (
    <div className="absolute z-80 w-full h-full bg-transparent ">
            <div className=" bg-white dark:bg-[#262b2f] mt-[20px] pb-[10px] border-b-[1px] dark:border-b-0 shadow-lg rounded-lg">
                <div className="flex items-center p-[15px] ">
                    <p className="text-[20px] font-semibold font-poppins mx-auto pl-[30px]">Add funds</p>
                    <BsX className="text-[30px] text-[rgb(112,122,131)] cursor-pointer" onClick={() => setShowAddFunds(false)}/>
                </div>
                <div className="flex items-center justify-center bg-white dark:bg-[#313336] rounded-lg mx-auto w-[60%] p-[10px]">
                    <AiOutlineArrowDown className="text-[20px] mr-[15px]"/>
                    <p className="font-semibold font-poppins">Deposit crypto</p>
                </div>
                <div className="relative w-[100px] h-[100px] mx-auto mt-[30px] mb-[20px]">
                    <Image src={wallet} objectFill='fill'/>
                </div>
                <div className="text-center text-[16px] font-poppins mx-[20px]">Transfer funds from an <span className="text-blue-600 cursor-pointer hover:text-blue-500">exchange <AiOutlineInfoCircle className="inline"/></span> or another wallet to your wallet address below:</div>
                <div className="flex justify-center items-center mx-[20px] my-[10px]">
                    <div className="cursor-not-allowed border-[1px] font-poppins border-[#3f3f3f] text-[16px] p-[10px] rounded-lg text-[rgba(0,0,0,0.4)] dark:text-[rgba(229,232,235,0.4)]">{address === undefined ? "..." : address.slice(0,25) + "..."}</div>
                    <div className="relative">
                        {showCopied && <p className="absolute dark:text-white font-poppins text-black right-[-75%] top-[20%]" >Copied!</p>}
                        <button className=" text-white font-semibold font-poppins bg-[#007aff] hover:bg-[#1683f8] px-[15px] py-[10px] ml-[20px] rounded-lg" onClick={() => handleCopy()}>Copy</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddFundsComponent