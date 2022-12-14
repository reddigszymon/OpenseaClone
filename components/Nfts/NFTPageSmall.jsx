import React, {useState, useEffect} from 'react'
import Details from "./Details"
import { useRouter } from "next/router";
import {MdRefresh} from 'react-icons/md'
import {RiShareBoxFill} from 'react-icons/ri'
import { useMarketplace } from "@thirdweb-dev/react";
import {BsHeart, BsFillHeartFill, BsThreeDotsVertical, BsFillPatchCheckFill} from 'react-icons/bs'
import {FaEthereum} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import {MdAccountBalanceWallet} from 'react-icons/md'
import ItemActivity from './ItemActivity'
import NftDescription from './NftDescription';
import MoreFromCollection from './MoreFromCollection'
import Router from 'next/router'
import {useAddress} from "@thirdweb-dev/react"
import toast, { Toaster } from 'react-hot-toast'
import Link from "next/link"
import MoonLoader from "react-spinners/MoonLoader";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise} from 'react-promise-tracker';


function NFTPageSmall({nft, listing, collection, username, allNfts, allListings}) {
  const router = useRouter()
  const address = useAddress()

  const [isOwner, setIsOwner] = useState(false)
  const [isNftOwner, setIsNftOwner] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const [listingsFiltered, setListingsFiltered] = useState([])
  const [profileRedirect, setProfileRedirect] = useState()
  const [sellerPrice, setSellerPrice] = useState(0)

  let {isListed, collectionAddress, id} = router.query;
  
  const price = listing.length < 1 ? "" : listing[0].buyoutCurrencyValuePerToken.displayValue
  const imageUrl = nft.length < 1 ? "" : nft[0].metadata.image
  const title = collection == undefined ? "" : collection.title
  const name = nft.length < 1 ? "" : nft[0].metadata.name
  const collectionAvatar = collection == undefined ? "" : collection.imageUrl
  const collectionDescription = collection == undefined ? "" : collection.description
  const nftId = listing.length < 1 ? "" : listing[0].id
  const sellerAddress = listing.length < 1 ? "" : listing[0].sellerAddress
  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );
  const { promiseInProgress } = usePromiseTracker();


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

  const confirmCreation = (toastHandler = toast) =>
  toastHandler.success(`Listing has been created!`, {
    style: {
      background: '#04111d',
      color: '#fff',
    },
  })

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
      await marketplace.direct.cancelListing(nftId)
      confirmCancelling()
    }
  }

  async function createListing() {
    if (nft[0] !== undefined) {
      const listing = {
        assetContractAddress: collectionAddress,
        tokenId: nft[0].metadata.id,
        startTimestamp: new Date(),
        listingDurationInSeconds: 86400,
        quantity: 1,
        currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        buyoutPricePerToken: sellerPrice
      }
      await marketplace.direct.createListing(listing)
      confirmCreation()
    }
  }
 
  useEffect(() => {
    if (sellerAddress === address) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [address, sellerAddress, collectionAddress])

  useEffect(() => {
    if (allListings !== undefined) {
        let array = []
        for (let i=0; i<allListings.length; i++) {
            if (allListings[i].assetContractAddress === collectionAddress) {
                array.push(allListings[i])
            }
        }
        setListingsFiltered(array)
    }
}, [allListings, address, collectionAddress])

useEffect(() => {
  if (listing[0] !== undefined) {
    setProfileRedirect(listing[0].sellerAddress)
  }
  if (nft[0] !== undefined) {
    setProfileRedirect(nft[0].owner)
  }
}, [address, nft, listing, collectionAddress])

useEffect(() => {
  if (nft[0] !== undefined) {
    if (nft[0].owner === address) {
      setIsNftOwner(true)
    } else {
      setIsNftOwner(false)
    }
  }
  
}, [address, nft, collectionAddress])

  return (
    <div className="p-[10px] font-poppins max-w-[600px] mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-between ">
          <div className="flex items-center mr-[15px]">
            <div className="text-[#2081e2] mr-[5px] cursor-pointer" onClick={() => {
            Router.push({
                pathname: `/collections/${collectionAddress}`,
            })
            }}>
              {title}
            </div>
            <BsFillPatchCheckFill size={20} color="rgb(32, 129, 226)"/>
          </div>
          <div className="flex items-center max-w-[200px] max-h-[100px] flex-wrap">
            <div className="dark:text-[#e5e8eb] dark:border-[#535353] dark:hover:text-white text-[24px] w-[48px] h-[48px] flex items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
              <MdRefresh/>
            </div>
            <div className="dark:text-[#e5e8eb] dark:border-[#535353] dark:hover:text-white text-[18px] w-[48px] h-[48px] flex items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
              <RiShareBoxFill/>
            </div>
            <div className="dark:text-[#e5e8eb] dark:border-[#535353] dark:hover:text-white hidden xxs:flex text-[20px] w-[48px] h-[48px] items-center justify-center border-[2px] rounded-lg cursor-pointer hover:text-[gray]">
              <BsThreeDotsVertical/>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-[30px] mb-[20px] dark:text-[#e5e8eb]">{"#" + name}</h1>
        </div>
        <div className="border-[1px] rounded-xl dark:border-0">
          <div className="py-[10px] text-[#676767] flex justify-between items-center dark:bg-[#303339] dark:rounded-t-lg">
            <FaEthereum className="ml-[10px] dark:text-[#8a939b]"/>
            {!favourite && <div className="flex items-center">
              <p className="text-[14px] text-[rgba(0,0,0,0.4)] dark:text-[#8a939b]">168</p>
              <BsHeart className="mr-[10px] ml-[10px] cursor-pointer dark:text-[#8a939b]" onClick={() => setFavourite(prev => !prev)}/>
            </div>}
            {favourite && <div className="flex items-center">
              <p className="text-[14px] text-[rgba(0,0,0,0.4)] dark:text-[#8a939b]">168</p>
              <BsFillHeartFill className="mr-[10px] ml-[10px] cursor-pointer text-[red]" onClick={() => setFavourite(prev => !prev)}/>
            </div>}
          </div>
          <div className="w-full h-auto max-w-[580px] ">
            <img className="w-full h-full" src={imageUrl}></img>
          </div>
        </div>
        <div className="mt-[20px] items-center flex justify-between">
          {!isNftOwner && <div className="dark:text-[#8a939b]">Owned by <span className="text-[#2081e2]"><Link href={"/profile/" + profileRedirect}><a>{username == undefined ? "" : username.userName}</a></Link></span></div>}
          {isNftOwner && <div className="dark:text-[#8a939b]">Owned by <span className="text-[#2081e2]"><Link href={"/profile/" + profileRedirect}><a>You</a></Link></span></div>}
          <div className="flex items-center">
            <BsFillHeartFill className="text-[gray] text-[20px]"/> 
            <p className="ml-[10px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]">168 favorites</p>
          </div>
        </div>
        {isListed && 
        <div className="border-[1px] rounded-lg p-[10px] mt-[20px] bg-[#fbfdff] dark:bg-[#262b2f] dark:border-0">
          <div className="text-[14px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]">Current Price</div> 
          <div className="flex items-center">
            <img className="w-[26px] h-[26px] mr-[5px]" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
            <div className="text-[30px] font-semibold dark:text-[#d3d5d7]">{price}</div>
          </div>

         {isOwner &&
          <div>
            {promiseInProgress &&
            <button disabled className="bg-[#2081e2] cursor-not-allowed text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
              <MoonLoader size={19} color={"#ffff"}/>
            </button>
            }

            {!promiseInProgress &&
            <button onClick={() => {trackPromise(cancelListing())}} className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
              <ImCross className="text-[24px] mr-[10px]"/>
              <p>Cancel Listing</p>
            </button>
            }
            
          </div>
          }

          {!isOwner &&
          <div>
            {promiseInProgress &&
            <button disabled className="bg-[#2081e2] cursor-not-allowed text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
              <MoonLoader size={19} color={"#ffff"}/>
            </button>
            }

            {!promiseInProgress &&
            <button onClick={() => {trackPromise(buyNow())}} className="bg-[#2081e2] hover:bg-[#2b87e3] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
              <MdAccountBalanceWallet className="text-[24px] mr-[10px]"/>
              <p>Buy now</p>
            </button>
            }
            
          </div>
          }

        </div>
        }

        {!isListed &&
        <div>
          {!isNftOwner && <div className="border-[1px] rounded-lg p-[10px] mt-[20px] bg-[#fbfdff] dark:bg-[#262b2f] dark:border-0">
            <div className="text-[18px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]">Item is not listed</div> 
            <button className="bg-[gray] cursor-default hover:bg-[#858585] text-white mt-[5px] w-full p-[15px] text-[16px] rounded-lg font-semibold flex items-center justify-center">
              <p>NFT is not listed</p>
            </button>
          </div>}

          {isNftOwner && 
          <div>
            {!promiseInProgress && 
              <div className="flex justify-between items-center mt-[5px]">
                <input onChange={(e) => setSellerPrice(e.target.value)} placeholder="Price of NFT" className="border-2 dark:border-0 w-[20%] rounded-l-lg h-[48px] p-[10px] text-[14px] placeholder:text-center outline-none placeholder:text-[#434444] dark:text-[#e5e8eb]"/>
                <button onClick={() => {trackPromise(createListing())}} className="bg-[#2081e2] hover:bg-[#2b87e3] text-white  w-[80%] p-[12px] text-[16px] rounded-r-lg font-semibold flex items-center justify-center">
                  <div className="flex">
                    <MdAccountBalanceWallet className="text-[24px] mr-[10px]"/>
                    <p>Sell</p>
                  </div>
                </button>
              </div>
            }

            {promiseInProgress &&
              <div className="flex justify-between items-center mt-[5px]">
                <input onChange={(e) => setSellerPrice(e.target.value)} placeholder="Price of NFT" className="border-2 dark:border-0 w-[20%] rounded-l-lg h-[48px] p-[10px] text-[14px] placeholder:text-center outline-none placeholder:text-[#434444] dark:text-[#e5e8eb]"/>
                <button disabled className="bg-[#2081e2] cursor-not-allowed text-white  w-[80%] p-[12px] text-[16px] rounded-r-lg font-semibold flex items-center justify-center">
                  <MoonLoader size={19} color={"#ffff"}/>
                </button>
              </div>
            }
            
          </div>
          }
        </div>
        
        }
        <NftDescription collectionAvatar={collectionAvatar} description={collectionDescription}/>
        <Details />
        <ItemActivity />
        <MoreFromCollection allNfts={allNfts} allListings={listingsFiltered}/>
    </div>
  )
}

export default NFTPageSmall