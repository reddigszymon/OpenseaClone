import React from 'react'
import {useEffect, useState} from "react"
import NFTCard from "./NFTCard"
import { nanoid } from 'nanoid'
import Router from 'next/router'
import { useRouter } from "next/router";

function NFTCards({nfts, listings}) {

    const router = useRouter()
    const [canRender, setCanRender] = useState(false)
    const {collectionId} = router.query
    let minPrice = 100000

    useEffect(() => {
        if (listings === undefined || nfts === undefined) {
            setCanRender(false)
        } else {
            setTimeout(() => {
                setCanRender(true)
            }, 5000)
        }
    }, [listings, nfts])

    let idsOfListedItems = []
    for (let i=0; i<listings.length; i++) {
        idsOfListedItems.push(listings[i].asset.name)
    }
    
    let itemsNotListed = []
    for (let i=0; i<nfts.length; i++) {
        if (!idsOfListedItems.includes(nfts[i].metadata.name)) {
            itemsNotListed.push(nfts[i])
        }
    }

    let sortedListings = []

    for (var oneListing in listings) {
        sortedListings.push(listings[oneListing])
    }

    sortedListings.sort(function(a,b) {
        return parseFloat(a.buyoutCurrencyValuePerToken.displayValue) - parseFloat(b.buyoutCurrencyValuePerToken.displayValue);
    })
    
    console.log({listings, sortedListings})

  return (
    <div className="flex flex-wrap mt-[10px]">
        {sortedListings.map(listing => (
                <div onClick={() => {
                    Router.push({
                        pathname: `/nfts/${listing.asset.name}`,
                        query: {isListed: true, collectionAddress: collectionId}
                    })
                }}  
                className=" w-full xs:w-[50%] sm:w-[33%] lg:w-[25%] xl:w-[20%] 2xl:w-[16.66%]  h-auto overflow-hidden flex items-center justify-center">
                    <div className="h-auto relative rounded-lg overflow-hidden p-[10px]">
                        {!canRender &&  <div></div>}
                        {canRender && <NFTCard key={nanoid()} image={listing.asset.image} price={listing.buyoutCurrencyValuePerToken.displayValue} id={listing.asset.name} isListed={true}/>}
                    </div>
                </div>
        ))}
        {itemsNotListed.map(item => (
                <div onClick={() => {
                    Router.push({
                        pathname: `/nfts/${item.metadata.name}`,
                        query: {isListed: false, collectionAddress: collectionId}
                    })
                }} 
                className="w-full xs:w-[50%] sm:w-[33%] lg:w-[25%] xl:w-[20%] 2xl:w-[16.66%] h-auto overflow-hidden flex items-center justify-center">
                    <div className="h-auto relative rounded-lg overflow-hidden p-[10px]">
                        {!canRender &&  <div></div>}
                        {canRender && <NFTCard key={nanoid()} image={item.metadata.image} price={0} id={item.metadata.name} isListed={false}/>}
                    </div>
                </div>
        ))}
    </div>
  )
}

export default NFTCards
