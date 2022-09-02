import React from "react";

function ScrollNFTCard({ image, price, id, isListed }) {
  return (
    <div className="shadow-sm hover:shadow-md p-[10px] rounded-lg cursor-pointer dark:bg-[rgb(53,56,64)]">
      <div className="overflow-hidden rounded-lg">
        <img src={image} className="h-full w-full transition-all hover:scale-[1.15] lg:hover:ease-in-out lg:duration-[400ms]"/>
      </div>
      <div className="font-poppins font-semibold text-[12px] sm600:text-[14px] mt-[10px]">
        {id}
      </div>
    
    {isListed && (
      <div className="font-poppins font-semibold text-[12px] mt-[10px] flex flex-col justify-start sm600:text-[16px]">
        <p>Price</p>
        <div className="flex">
          <img
            className="w-[16px] h-[16px] mr-[5px] mt-[3px]"
            src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
          />
          <p className="text-[14px] sm600:text-[16px]">{price}</p>
        </div>
      </div>
    )}
    {!isListed && (
        <div className="font-poppins font-semibold text-[12px] mt-[10px] flex flex-col justify-start sm600:text-[16px]">
          <p>Price</p>
          <div className="flex">
            <p className="text-[14px] font-thin sm600:text-[16px]">Not Listed</p>
          </div>
        </div>
      )}
    </div>
  );
}

module.exports = ScrollNFTCard;
