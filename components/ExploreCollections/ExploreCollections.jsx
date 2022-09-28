import React, {useState, useMemo} from 'react'
import CollectionCard from "../ExploreCollections/CollectionCard"
import {useAddress} from "@thirdweb-dev/react"
import {client} from "../../lib/sanityClient"
import Router from 'next/router'

function ExploreCollections({data}) {
   
    const children = data.map(item => (
        <div className="md:w-[48%] xl:w-[32%] 2xl:w-[24%]"
        onClick={() => {
          Router.push({
              pathname: `/collections/${item.contractAddress}`,
          })
      }}
        >
            <CollectionCard banner={item.bannerImageUrl} title={item.title} avatar={item.imageUrl}/>
        </div>
    ))

  return (
    <div className="font-poppins px-[20px] pb-[20px]">
        <h1 className='text-[28px] font-bold my-[50px]'>Explore collections</h1>
        <div className="flex flex-wrap gap-[20px]">
          {children}
        </div>
    </div>
  )
}

export default ExploreCollections