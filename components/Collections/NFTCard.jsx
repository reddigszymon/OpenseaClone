import React from 'react'

function NFTCard({image, price, id, isListed}) {
  return (
    <div className="shadow-md p-[10px] rounded-lg hover:shadow-2xl cursor-pointer hover:scale-105 dark:bg-[rgb(53,56,64)]">
        <img src={image}/>
        <div className="font-poppins font-semibold text-[12px] mt-[10px]">
            {id}
        </div>
        {isListed && <div className="font-poppins font-semibold text-[12px] mt-[10px] flex flex-col justify-start">
            <p>Price</p>
            <div className="flex">
                <img className="w-[16px] h-[16px] mr-[5px] mt-[3px]" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
                <p className="text-[14px]">{price}</p>
            </div>
        </div>}
        {!isListed && <div className="font-poppins font-semibold text-[12px] mt-[10px] flex flex-col justify-start">
            <p>Price</p>
            <div className="flex">
                <p className="text-[14px] font-thin">Not Listed</p>
            </div>
        </div>}
    </div>
  )
}

export default NFTCard