import React from 'react'
import Details from "./Details"
import { useRouter } from "next/router";
import {MdRefresh} from 'react-icons/md'
import {GrShare} from 'react-icons/gr'
import {BsHeart, BsFillHeartFill, BsThreeDotsVertical, BsFillPatchCheckFill} from 'react-icons/bs'
import {FaEthereum} from 'react-icons/fa'
import {MdAccountBalanceWallet} from 'react-icons/md'
import ItemActivity from './ItemActivity'
import NftDescription from './NftDescription';
import MoreFromCollection from './MoreFromCollection'
import Router from 'next/router'


function NFTPageSmall({nft, listing, collection, username, allNfts, allListings}) {
  const router = useRouter()
  let {isListed, collectionAddress, id} = router.query;
  const price = listing.length < 1 ? 0 : listing[0].buyoutCurrencyValuePerToken.displayValue
  const imageUrl = nft.length < 1 ? "" : nft[0].metadata.image
  const title = collection == undefined ? "" : collection.title
  const name = nft.length < 1 ? "" : nft[0].metadata.name
  const collectionAvatar = collection == undefined ? "" : collection.imageUrl
  
  if (isListed === "true") {
    isListed = true
  } else {
    isListed = false
  }



  return (
    <div className="p-[10px] font-poppins max-w-[600px] mx-auto">
        <div className="flex items-center justify-between ">
          <div className="flex items-center mr-[15px]">
            <div className="text-[#2081e2] mr-[5px] w-[175px] cursor-pointer" onClick={() => {
            Router.push({
                pathname: `/collections/${collectionAddress}`,
            })
            }}>
              {title}
            </div>
            <BsFillPatchCheckFill size={20} color="rgb(32, 129, 226)"/>
          </div>
          <div className="flex items-center max-w-[200px] max-h-[100px] flex-wrap">
            <div className="text-[24px] w-[48px] h-[48px] flex items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
              <MdRefresh/>
            </div>
            <div className="text-[18px] w-[48px] h-[48px] flex items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
              <GrShare/>
            </div>
            <div className="hidden xxs:flex text-[20px] w-[48px] h-[48px] items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
              <BsThreeDotsVertical/>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-[30px] mb-[20px]">{"#" + name}</h1>
        </div>
        <div className="border-[1px]  rounded-xl">
          <div className="py-[10px] text-[#676767] flex justify-between items-center">
            <FaEthereum className="ml-[10px]"/>
            <div className="flex items-center">
              <p className="text-[14px] text-[rgba(0,0,0,0.4)]">168</p>
              <BsHeart className="mr-[10px] ml-[10px] cursor-pointer"/>
            </div>
          </div>
          <div className="w-full h-auto max-w-[580px] ">
            <img className="w-full h-full" src={imageUrl}></img>
          </div>
        </div>
        <div className="mt-[20px] items-center flex justify-between">
          <div>Owned by <span className="text-[#2081e2]">{username == undefined ? "" : username.userName}</span></div>
          <div className="flex items-center">
            <BsFillHeartFill className="text-[gray] text-[20px]"/> 
            <p className="ml-[10px] text-[rgba(0,0,0,0.5)]">168 favorites</p>
          </div>
        </div>
        {isListed && 
        <div className="border-[1px] rounded-lg p-[10px] mt-[20px] bg-[#fbfdff]">
          <div className="text-[14px] text-[rgba(0,0,0,0.5)]">Current Price</div> 
          <div className="flex items-center">
            <img className="w-[26px] h-[26px] mr-[5px]" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
            <div className="text-[30px] font-semibold">{price}</div>
          </div>

          <button className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
            <MdAccountBalanceWallet className="text-[24px] mr-[10px]"/>
            <p>Buy now</p>
          </button>
        </div>}
        {!isListed && 
        <div className="border-[1px] rounded-lg p-[10px] mt-[20px] bg-[#fbfdff]">
          <div className="text-[18px] text-[rgba(0,0,0,0.5)]">Item is not listed</div> 
          <button className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
            <MdAccountBalanceWallet className="text-[24px] mr-[10px]"/>
            <p>Make Offer</p>
          </button>
        </div>}
        <NftDescription collectionAvatar={collectionAvatar}/>
        <Details />
        <ItemActivity />
        <MoreFromCollection allNfts={allNfts} allListings={allListings}/>
    </div>
  )
}

export default NFTPageSmall