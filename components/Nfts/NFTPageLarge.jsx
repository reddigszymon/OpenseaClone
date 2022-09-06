import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import {MdRefresh} from 'react-icons/md'
import {RiShareBoxFill} from 'react-icons/ri'
import {BsHeart, BsFillHeartFill, BsThreeDotsVertical, BsFillPatchCheckFill} from 'react-icons/bs'
import {FaEthereum} from 'react-icons/fa'
import {MdAccountBalanceWallet} from 'react-icons/md'
import ItemActivity from './ItemActivity'
import {ImCross} from 'react-icons/im'
import NftDescription from './NftDescription';
import Details from "./Details"
import MoreFromCollection from './MoreFromCollection'
import Router from 'next/router'
import { useMarketplace, useAddress } from "@thirdweb-dev/react";
import toast, { Toaster } from 'react-hot-toast'



function NFTPageLarge({nft, listing, collection, username, allNfts, allListings, module}) {

  const [isOwner, setIsOwner] = useState(false)

  const router = useRouter()

  const address = useAddress()
  let {isListed, collectionAddress, id} = router.query;
  const price = listing.length < 1 ? 0 : listing[0].buyoutCurrencyValuePerToken.displayValue
  const imageUrl = nft.length < 1 ? "" : nft[0].metadata.image
  const title = collection == undefined ? "" : collection.title
  const name = nft.length < 1 ? "" : nft[0].metadata.name
  const collectionAvatar = collection == undefined ? "" : collection.imageUrl
  const nftId = listing.length < 1 ? "" : listing[0].id
  const sellerAddress = listing.length < 1 ? "" : listing[0].sellerAddress
  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );

  const confirmPurchase = (toastHandler = toast) =>
  toastHandler.success(`Purchase successful!`, {
    style: {
      background: '#04111d',
      color: '#fff',
    },
  })

  const confirmCancelling = (toastHandler = toast) =>
  toastHandler.success(`Listing has been cancelled!`, {
    style: {
      background: '#04111d',
      color: '#fff',
    },
  })

  useEffect(() => {
    if (sellerAddress === address) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [address, sellerAddress])

  if (isListed === "true") {
    isListed = true
  } else {
    isListed = false
  }

  async function buyNow() {
    if (marketplace !== undefined) {
      await marketplace.buyoutListing(nftId, 1)
      confirmPurchase()
    }
  }

  async function cancelListing() {
    if (marketplace !== undefined) {
      await marketplace.cancelListing(nftId)
      confirmCancelling()
    }
  }

  return (
    <>
    <div className="px-[10px] py-[15px] font-poppins mx-auto max-w-[1260px] flex">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col flex-1">
        <div className="dark:border-0 border-[1px] rounded-xl mb-[20px] dark:bg-[#303339]">
             <div className="py-[10px] text-[#676767] flex justify-between items-center">
               <FaEthereum className="ml-[10px] dark:text-[#8a939b]"/>
               <div className="flex items-center">
                 <p className="text-[14px] text-[rgba(0,0,0,0.4)] dark:text-[#8a939b]">168</p>
                 <BsHeart className="mr-[10px] ml-[10px] cursor-pointer dark:text-[#8a939b]"/>
               </div>
             </div>
             <div className="w-full h-auto max-w-[580px] ">
               <img className="w-full h-full" src={imageUrl}></img>
             </div>
          </div>
          <div className="mb-[1px]">
            <NftDescription collectionAvatar={collectionAvatar}/>
          </div>
          <Details />
      </div>
      <div className="flex flex-col w-[650px] ml-[30px]">
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
              <div className="dark:text-[#e5e8eb] dark:border-[#535353] text-[24px] w-[48px] h-[48px] flex items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
                <MdRefresh/>
              </div>
              <div className="dark:text-[#e5e8eb] dark:border-[#535353] text-[18px] w-[48px] h-[48px] flex items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
                <RiShareBoxFill/>
              </div>
              <div className="dark:text-[#e5e8eb] dark:border-[#535353] hidden xxs:flex text-[20px] w-[48px] h-[48px] items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
                <BsThreeDotsVertical/>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-[30px] mb-[20px] dark:text-[#e5e8eb]">{"#" + name}</h1>
          </div>
          <div className="mt-[20px] items-center flex justify-between">
           <div className="dark:text-[#e5e8eb]">Owned by <span className="text-[#2081e2]">{username == undefined ? "" : username.userName}</span></div>
           <div className="flex items-center">
             <BsFillHeartFill className="text-[gray] text-[20px]"/> 
             <p className="ml-[10px] text-[rgba(0,0,0,0.5)] dark:text-[#e5e8eb]">168 favorites</p>
           </div>
         </div>
         {isListed && 
        <div className="border-[1px] rounded-lg p-[10px] mt-[20px] bg-[#fbfdff] dark:bg-[#303339] dark:border-0">
          <div className="text-[14px] text-[rgba(0,0,0,0.5)] dark:text-[#e5e8eb]">Current Price</div> 
          <div className="flex items-center">
            <img className="w-[26px] h-[26px] mr-[5px]" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
            <div className="text-[30px] font-semibold dark:text-[#d3d5d7]">{price}</div>
          </div>

          {!isOwner && <button onClick={() => buyNow()} className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
            <MdAccountBalanceWallet className="text-[24px] mr-[10px]"/>
            <p>Buy now</p>
          </button>}
          {isOwner && <button onClick={() => cancelListing()} className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
            <ImCross className="text-[24px] mr-[10px]"/>
            <p>Cancel Listing</p>
          </button>}
        </div>}
        {!isListed && 
        <div className="border-[1px] rounded-lg p-[10px] mt-[20px] bg-[#fbfdff] dark:bg-[#303339] dark:border-0 ">
          <div className="text-[18px] text-[rgba(0,0,0,0.5)] dark:text-[#e5e8eb]">Item is not listed</div> 
          <button className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
            <MdAccountBalanceWallet className="text-[24px] mr-[10px]"/>
            <p>Make Offer</p>
          </button>
        </div>}
        <ItemActivity />
        </div>
    </div>
    <div className="max-w-[1260px] mx-auto mb-[5px] px-[10px]">
      <MoreFromCollection allNfts={allNfts} allListings={allListings}/>
    </div>
    </>
  )
}

export default NFTPageLarge