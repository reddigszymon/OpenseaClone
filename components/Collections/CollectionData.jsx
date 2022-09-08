import React, { useEffect } from 'react'
import Image from 'next/image'
import {BsShareFill, BsThreeDots, BsFillPatchCheckFill} from "react-icons/bs"
import {useState} from 'react'
import useWindowDimensions from "../../hooks/useWindowDimensions"
import NFTCards from "./NFTCards"
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { useRouter } from "next/router";
import { useNFTCollection } from "@thirdweb-dev/react";
import {useAddress} from "@thirdweb-dev/react"


const styles = {
    wrapper: `overflow-hidden dark:bg-[rgb(32,34,37)]`,
    imageWrapper: `relative h-[20vh] sm:h-[25vh] lg:h-[30vh] w-screen`,
    avatarDiv: `absolute bg-white dark:bg-[rgb(32,34,37)] dark: p-[1px] rounded-lg top-[75%] left-[20px] sm:top-[60%] shadow-lg 2xl:left-[60px]`,
    logo: `border-[6px] border-white dark:border-[rgb(32,34,37)] border-lg relative h-[82px] w-[82px] sm:w-[112px] sm:h-[112px] lg:w-[168px] lg:h-[168px] 2xl:w-[200px] 2xl:h-[200px]`,
    iconsWrapper: `2xl:px-[50px]`,
    icons: `flex items-center w-full justify-end p-[30px] cursor-pointer`,
    titleWrapper: `flex items-center ml-[20px] mb-[10px] 2xl:mt-[30px]`,
    title: `text-[24px] font-semibold mr-[5px] font-poppins sm:text-[30px]`,
    companyWrapper: `ml-[20px] flex items-center mb-[10px]`,
    companyStyling: `mr-[6px] font-poppins`,
    seeMore: `mx-[20px] font-poppins text-[14px] sm:text-[16px] mb-[10px] max-w-[900px]`,
    seeMoreStyling: `mt-[3px] cursor-pointer`,
    seeMorePositioning: `flex items-center`,
    infoWrapper: `mx-[20px] flex justify-start items-center mb-[20px]`,
    infoDiv: `items-center justify-start flex-col mr-[30px] lg:mr-[50px]`,
    numberTop: `font-semibold text-[20px] font-poppins`,
    numberBottom: `font-poppins text-[14px]`,
    volumeDiv: `font-semibold flex items-center text-[20px] font-poppins`,
    xsDiv: `hidden xs:block items-center justify-start flex-col`,
    floorPriceDiv: `font-semibold flex items-center text-[20px] font-poppins`,
    ethImage: `w-[16px] h-[16px] mr-[5px]`,
    bottomText: `font-poppins text-[14px]`,
    biggerWrapper: `xs:hidden mx-[20px] flex justify-start items-center mb-[20px]`,
    biggerWrapperFlex: `items-center justify-start flex-col mr-[33px]`,
    bigFloorPrice: `font-semibold flex items-center text-[20px] font-poppins`
}


function CollectionData({bannerImageUrl, imageUrl, title, company, description, allOwners, volumeTraded, listings}) {

    const [showText, setShowText] = useState(false)
    const {width, height} = useWindowDimensions()
    const [floor, setFloor] = useState(0)
    const [numOwners, setNumOwners] = useState(0)
    const [creator, setCreator] = useState(false)
    const [listingsFiltered, setListingsFiltered] = useState([])
    const [nfts, setNfts] = useState([])

    const router = useRouter();
    const { collectionId } = router.query;
    const nftCollection = useNFTCollection(collectionId);
    const address = useAddress()

    let floorPrice
    let ownerArray = []

    useEffect(() => {
        if (listingsFiltered === undefined) {
            floorPrice = 0
        }
        if (listingsFiltered !== undefined) {
            floorPrice = 100000000
            listingsFiltered.map(listing => {
                if (parseFloat(listing.buyoutCurrencyValuePerToken.displayValue) <= floorPrice ) {
                    floorPrice = parseFloat(listing.buyoutCurrencyValuePerToken.displayValue)
                }
            })
            if (floorPrice < 10000) {
                setFloor(floorPrice)
            }
        }
    }, [nfts, listingsFiltered])

    useEffect(() => {
        if (company !== undefined && company !== null) {
            setCreator(true)
        }
    })

    async function grabOwners() {
        if (nfts === undefined) return
        nfts.forEach(nft => {
            if (!ownerArray.includes(nft.owner)) {
                ownerArray.push(nft.owner)
            }
        })
        setNumOwners(ownerArray.length)
    }

    useEffect(() => {
        grabOwners()
    }, [nfts, address])

    useEffect(() => {
        if (listings !== undefined) {
            let array = []
            for (let i=0; i<listings.length; i++) {
                if (listings[i].assetContractAddress === collectionId) {
                    array.push(listings[i])
                }
            }
            setListingsFiltered(array)
        }
    }, [listings, address])

    const getNfts = async () => {
        try {
          const myNfts = await nftCollection.getAll();
          setNfts(myNfts);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getNfts();
      }, [address]);


  return (
    <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
            <Image src={bannerImageUrl} layout='fill' objectFit='cover' />
            <div className={styles.avatarDiv}>
                <div className={styles.logo}>
                    <Image src={imageUrl} layout='fill' objectFit='cover' />
                </div>
            </div>
        </div>
        <div className={styles.iconsWrapper}>
            <div className={styles.icons}>
                <BsShareFill size={20}/>
                <BsThreeDots className="ml-[30px]" size={20}/>
            </div>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>{title}</h1>
                <BsFillPatchCheckFill size={20} color="rgb(32, 129, 226)"/>
            </div>
            {creator && <div className={styles.companyWrapper}>
                <p className={styles.companyStyling}>
                    <div>
                        {"By " + company}
                    </div>
                </p>
                <BsFillPatchCheckFill size={14} color="rgb(32, 129, 226)"/>
            </div>}
            <div className={styles.seeMore}>
                <div>
                    {!showText && (description == undefined ? ".." : description.slice(0,Math.round(width/8)) + '...')}
                    {showText && (description == undefined ? ".." : description)}
                </div>
                <div onClick={() => setShowText(prev => !prev)} className={styles.seeMoreStyling}>
                    {!showText && <div className={styles.seeMorePositioning}>
                        <p className="mr-[2px] ">See more</p>
                        <IoIosArrowDown/>
                    </div>}
                    {showText && <div className={styles.seeMorePositioning}>
                        <p className="mr-[2px] ">See less</p>
                        <IoIosArrowUp/>
                    </div>}
                </div>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.infoDiv}>
                    <p className={styles.numberTop}>{nfts == undefined ? "..." : nfts.length}</p>
                    <p className={styles.numberBottom}>items</p>
                </div>
                <div className={styles.infoDiv}>
                    <p className={styles.numberTop}>{numOwners}</p>
                    <p className={styles.numberBottom}>owners</p>
                </div>
                <div className={styles.infoDiv}>
                    <div className={styles.volumeDiv}>
                        <img className={styles.ethImage} src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
                        {volumeTraded}
                    </div>
                    <p className={styles.bottomText}>total volume</p>
                </div>
                <div className={styles.xsDiv}>
                    <div className={styles.floorPriceDiv}>
                        <img className={styles.ethImage} src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
                        {floor}
                    </div>
                    <p className={styles.bottomText}>floor price</p>
                </div>
            </div>
            <div className={styles.biggerWrapper}>
                <div className={styles.biggerWrapperFlex}>
                    <div className={styles.bigFloorPrice}>
                        <img className={styles.ethImage} src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
                        {floor}
                    </div>
                    <p className={styles.bottomText}>floor price</p>
                </div>
            </div>
            <div className="dark:hidden">
                <hr/>
            </div>
            <NFTCards listings={listingsFiltered} nfts={nfts}/>
        </div>
        
    </div>
  )
}

export default CollectionData