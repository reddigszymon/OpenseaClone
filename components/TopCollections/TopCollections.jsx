import React from 'react'
import Collection from "./Collection"
import CollectionUp from "./CollectionUp"
import bayc from "../../assets/bayc.png"
import cryptopunk from "../../assets/cryptopunk.png"
import potatoz from "../../assets/potatoz.gif"
import azuki from "../../assets/azuki.png"
import mayc from "../../assets/mayc.png"
import moonbirds from "../../assets/moonbirds.png"
import apepe from "../../assets/apepe.jpg"
import ladyape from "../../assets/ladyape.gif"
import aliens from "../../assets/8liens.gif"
import looki from "../../assets/looki.png"
import Router from 'next/router'

function TopCollections() {
  return (
    <div className="flex-col mx-auto justify-center items-center  dark:bg-[#202225] pb-[2em]">
      <h2 className="text-[24px] px-[15px] font-semibold tracking-wide text-center pt-[2em]">Top collections over <span className="text-[#2081e2]">last 24 hours</span></h2>
      <div className="dark:bg-[#202225] pt-[3em] lg:hidden flex-col gap-[1em]">
          <div onClick={() => Router.push({pathname: '/collections/0xa9d524c82a5e5530AE26Ae194f8caCE75C8097F4'})}>
            <Collection id="1" collectionName="Bored Ape Yacht Club" floorPrice="64" percentage="-44,02%" volume="13 011,02" image={bayc}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x8d82385a1f7e2252341108075Ff4B13684A8bf03'})}>
            <Collection id="2" collectionName="CryptoPunks" floorPrice="-" percentage="-65,33%" volume="12 838,96" image={cryptopunk}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x2F9867cd403bc4284Db385E9f2Cc6dBb0510C41b'})}>
            <Collection id="3" collectionName="The Potatoz" floorPrice="1.13" percentage="-25,12%" volume="11 671,44" image={potatoz}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x2277119219C95137f8031d1f411A0119B7a652AF'})}>
            <Collection id="4" collectionName="Azuki" floorPrice="1.62" percentage="-49,87%" volume="10 840,56" image={azuki}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0xFe9d5c1405A7E6fA45587fE9b0EcE6902Fb286C3'})}>
            <Collection id="5" collectionName="Mutant Ape Yacht Club" floorPrice="12.37" percentage="-28,64%" volume="9858,83" image={mayc}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0xaF9B59140F0FE97Fe6434BBC1C5CA77442468F7f'})}>
            <Collection  id="6" collectionName="Moonbirds" floorPrice="13.45" percentage="-4,48%" volume="7551,85" image={moonbirds}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x5d5C3972569594ce1A46Fd210f2b4a9D87C32127'})}>
            <CollectionUp id="7" collectionName="Rare Apepe YC" floorPrice="0.56" percentage="+20,5%" volume="6771,52" image={apepe} />
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x12683A308B8c63B07748B7661d70a36b1135930e'})}>
            <CollectionUp id="8" collectionName="Lady Ape Club" floorPrice="0.6" percentage="+3922,22%" volume="6141,31" image={ladyape}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0xd1371Cd874C2E54BfF48fe81F29d50E76Ce2EB1B'})}>
            <Collection id="9" collectionName="8liens NFT" floorPrice="0.14" percentage="-10,33%" volume="5236,46" image={aliens}/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x0cfaE52A01D13FfD842764198957071d8b138DA5'})}>
            <Collection id="10" collectionName="Looki" floorPrice="< 0.01" percentage="-60,06%" volume="5126,05" image={looki}/>
          </div>
      </div>
      <div className="flex gap-[1em] justify-center items-center xl:pt-[2em]">
        <div className="dark:bg-[#202225] pt-[3em] hidden lg:block">
        <div onClick={() => Router.push({pathname: '/collections/0xa9d524c82a5e5530AE26Ae194f8caCE75C8097F4'})}>
            <Collection id="1" collectionName="Bored Ape Yacht Club" floorPrice="64" percentage="-44,02%" volume="13 011,02" image={bayc} color="red"/>
        </div>
        <div onClick={() => Router.push({pathname: '/collections/0x8d82385a1f7e2252341108075Ff4B13684A8bf03'})}>
            <Collection id="2" collectionName="CryptoPunks" floorPrice="-" percentage="-65,33%" volume="12 838,96" image={cryptopunk} color="red"/>
        </div>
        <div onClick={() => Router.push({pathname: '/collections/0x2F9867cd403bc4284Db385E9f2Cc6dBb0510C41b'})}>
            <Collection id="3" collectionName="The Potatoz" floorPrice="1.13" percentage="-25,12%" volume="11 671,44" image={potatoz} color="red"/>
        </div>
        <div onClick={() => Router.push({pathname: '/collections/0x2277119219C95137f8031d1f411A0119B7a652AF'})}>
            <Collection id="4" collectionName="Azuki" floorPrice="1.62" percentage="-49,87%" volume="10 840,56" image={azuki} color="red"/>
        </div>
        <div onClick={() => Router.push({pathname: '/collections/0xFe9d5c1405A7E6fA45587fE9b0EcE6902Fb286C3'})}>
            <Collection id="5" collectionName="Mutant Ape Yacht Club" floorPrice="12.37" percentage="-28,64%" volume="9858,83" image={mayc} color="red"/>
        </div>
        </div>
        <div className="dark:bg-[#202225] pt-[3em] hidden lg:block">
          <div onClick={() => Router.push({pathname: '/collections/0xaF9B59140F0FE97Fe6434BBC1C5CA77442468F7f'})}>
            <Collection id="6" collectionName="Moonbirds" floorPrice="13.45" percentage="-4,48%" volume="7551,85" image={moonbirds} color="red"/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x5d5C3972569594ce1A46Fd210f2b4a9D87C32127'})}>
            <CollectionUp id="7" collectionName="Rare Apepe YC" floorPrice="0.56" percentage="+20,5%" volume="6771,52" image={apepe} color="green"/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x12683A308B8c63B07748B7661d70a36b1135930e'})}>
            <CollectionUp id="8" collectionName="Lady Ape Club" floorPrice="0.6" percentage="+3922,22%" volume="6141,31" image={ladyape} color="green"/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0xd1371Cd874C2E54BfF48fe81F29d50E76Ce2EB1B'})}>
            <Collection id="9" collectionName="8liens NFT" floorPrice="0.14" percentage="-10,33%" volume="5236,46" image={aliens} color="red"/>
          </div>
          <div onClick={() => Router.push({pathname: '/collections/0x0cfaE52A01D13FfD842764198957071d8b138DA5'})}>
            <Collection id="10" collectionName="Looki" floorPrice="< 0.01" percentage="-60,06%" volume="5126,05" image={looki} color="red"/>
          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default TopCollections