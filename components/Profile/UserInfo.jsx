import React, {useState, useEffect} from 'react'
import {BsShareFill, BsThreeDots} from "react-icons/bs"
import { useRouter } from "next/router";
import {useAddress} from "@thirdweb-dev/react"
import NFTCard from "../Collections/NFTCard"
import { nanoid } from 'nanoid'
import Router from 'next/router'
import {FiEdit2} from "react-icons/fi"
import {client} from "../../lib/sanityClient"


function UserInfo({nfts, listings, userData}) {

  const [canRender, setCanRender] = useState(false)
  const [newListings, setNewListings] = useState([])
  const [edit, setEdit] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [myUserName, setMyUserName] = useState(userData[0].userName)
  const [isOwner, setIsOwner] = useState(false)
  
  const router = useRouter();
  const { wallet } = router.query;
  const address = useAddress()



  useEffect(() => {
    let uris = []
    let filteredListings = []
    const { wallet } = router.query;
    if (listings !== undefined) {
      for (let i=0; i<listings.length; i++) {
        if (wallet === listings[i].sellerAddress) {
          uris.push(listings[i].asset.uri)
          filteredListings.push(listings[i])
        }
      }
      for (let i=0; i<nfts.length; i++) {
        if (uris.includes(nfts[i].metadata.uri)) {
          nfts.splice(i, 1)
        }
      }
      setNewListings(filteredListings)
    }
  }, [nfts, listings, wallet])


  useEffect(() => {
    if (listings !== undefined) {
      setCanRender(true)
    }
  }, [listings, wallet])

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setEdit(false)
      uploadUserName()
    }
  }

  const uploadUserName = async () => {
    const result = await client.patch(wallet).set({userName: newUserName}).commit()
    setMyUserName(newUserName)
  }
  useEffect(() => {
    if (wallet === address) {
      setIsOwner(true)
    }
  }, [address, wallet])

  return (
    <div className="px-[15px] font-poppins pb-[20px] mb-[208px]">
        <div className="flex w-full justify-end py-[25px]">
            <BsShareFill className="text-[20px]"/>
            <BsThreeDots className="ml-[30px] text-[20px]"/>
        </div>
        <div className="mb-[10px] ml-[20px]">
          <div className="flex items-center relative">
            {!edit && <h2 className=" text-[24px] font-semibold mr-[10px]">{myUserName}</h2>}
            {edit && 
            <input placeholder={myUserName}
            onKeyDown={(e) => handleSubmit(e)}
             onChange={(e) => setNewUserName(e.target.value)}
             autoFocus
             className="outline-none w-[120px] placeholder:text-[24px] h-[36px] mr-[10px] text-[24px]">
            </input>}
            {isOwner && <FiEdit2 onClick={() => setEdit(prev => !prev)} className="cursor-pointer"/>}
          </div>
            <p className="text-[14px] text-[rgba(0,0,0,0.5)] dark:text-white">Joined September 2021</p>
        </div>
        <div className="flex flex-wrap mt-[10px]">
        {canRender && newListings.map(listing => (
                <div onClick={() => {
                    Router.push({
                        pathname: `/nfts/${listing.asset.name}`,
                        query: {isListed: true, collectionAddress: listing.assetContractAddress}
                    })
                }}  
                className=" w-full xs:w-[50%] sm:w-[33%] lg:w-[25%] xl:w-[20%] 2xl:w-[16.66%]  h-auto overflow-hidden flex items-center justify-center">
                    <div className="h-auto relative rounded-lg overflow-hidden p-[10px]">
                        <NFTCard key={nanoid()} image={listing.asset.image} price={listing.buyoutCurrencyValuePerToken.displayValue} id={listing.asset.name} isListed={true}/>
                    </div>
                </div>
        ))}
        {canRender && nfts.map(listing => (
                <div onClick={() => {
                    Router.push({
                        pathname: `/nfts/${listing.metadata.name}`,
                        query: {isListed: false, collectionAddress: listing.contractAddress}
                    })
                }}  
                className=" w-full xs:w-[50%] sm:w-[33%] lg:w-[25%] xl:w-[20%] 2xl:w-[16.66%]  h-auto overflow-hidden flex items-center justify-center">
                    <div className="h-auto relative rounded-lg overflow-hidden p-[10px]">
                        <NFTCard key={nanoid()} image={listing.metadata.image} price={0} id={listing.metadata.name} isListed={false}/>
                    </div>
                </div>
        ))}
        </div>

    </div>
  )
}

export default UserInfo