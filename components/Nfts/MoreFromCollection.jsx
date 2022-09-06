import React, {useMemo, useState} from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md"
import {BsCollection} from 'react-icons/bs'
import ScrollNFTCard from './ScrollNFTCard'
import Router from 'next/router'
import { useRouter } from "next/router";


function MoreFromCollection({allNfts, allListings}) {
  const [showMoreFromCollection, setShowMoreFromCollection] = useState(false)
  const [scrollingNfts, setScrollingNfts] = useState([])
  const scrollNfts = []

  const router = useRouter()
  const {isListed, collectionAddress, id} = router.query;
  

  function populateNfts() {
    const scrollIds = []
    for (let i=0; i<allListings.length; i++) {
      if (allListings[i].asset.name !== id) {
        scrollNfts.push(allListings[i])
        scrollIds.push(allListings[i].asset.name)
      }
    }


    if (scrollNfts.length < 10) {
      for (let i=0; i<allNfts.length; i++) {
        if (!scrollIds.includes(allNfts[i].metadata.name) && allNfts[i].metadata.name !== id) {
          scrollNfts.push(allNfts[i])
        }
      }
    }

    setScrollingNfts(scrollNfts)
  }

  useMemo(populateNfts, [router.query, showMoreFromCollection])


  const scrollCards = scrollingNfts.map(nft => {
    return (
      <div className="min-w-[178px] min-h-[260px] max-w-[240px] max-h-[360px] sm600:w-[370px] 
      sm600:h-[488px] sm600:max-w-[550px] sm600:max-h-[678px] lg:max-w-[300px] lg:max-h-[415px]" 
      onClick={() => {
        Router.push({
            pathname: `/nfts/${nft.asset === undefined ? nft.metadata.name : nft.asset.name}`,
            query: {isListed: nft.asset === undefined ? false : true, collectionAddress: collectionAddress}
        })
        }}>

        <ScrollNFTCard image={nft.asset === undefined ? nft.metadata.image : nft.asset.image}
        price={nft.asset === undefined ? "" : nft.buyoutCurrencyValuePerToken.displayValue}
        id={nft.asset === undefined ? nft.metadata.name : nft.asset.name}
        isListed = {nft.asset === undefined ? false : true}
        key = {nft.asset === undefined ? nft.metadata.name : nft.asset.name}
        />
      </div>
    )
  })


  return (
    <div>
      <div onClick={() => setShowMoreFromCollection(prev => !prev)} className="lg:p-[25px] dark:bg-[#262b2f] dark:text-[#d3d5d7] dark:border-0 flex items-center border-[1px] px-[20px] py-[20px] mt-[5px] justify-between cursor-pointer">
            <div className="flex">
                <BsCollection className="mr-[10px] text-[26px]"/>
                <p className="font-semibold lg:text-[18px]">More From This Collection</p>
            </div>
            {!showMoreFromCollection && <MdOutlineKeyboardArrowDown className="text-[26px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]"/>}
            {showMoreFromCollection && <MdOutlineKeyboardArrowUp className="text-[26px] text-[rgba(0,0,0,0.5)] dark:text-[#8a939b]"/>}
      </div>
      {showMoreFromCollection && <ScrollMenu>
        <div className="flex gap-[10px] mt-[10px]">
          {scrollCards}
        </div>
      </ScrollMenu>}
    </div>
  )
}

export default MoreFromCollection