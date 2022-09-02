import React from 'react'
import Image from 'next/image'
import {FaEthereum} from 'react-icons/fa'



function Collection({id, collectionName, floorPrice, percentage, volume, image}) {
  const styles = {
    wrapper: `w-full max-w-[440px] mx-auto px-[15px] lg:max-w-[500px]  xl:max-w-[600px] xl:w-[900px] flex justify-between items-center py-[1em] dark:border-black dark:hover:bg-[#1d2229] border-b-[1px] hover:shadow-2xl hover:border-y-[2px] cursor-pointer hover:bg-[rgb(246,246,247)]`,
    leftContainer: `flex items-center`,
    id: `text-lg font-bold w-[30px]`,
    picture: `relative w-[50px] h-[50px] mx-[5px] rounded-full overflow-hidden`,
    nameOfCollection: `font-semibold text-[14px] font-poppins`,
    floorPrice: `flex items-center text-[14px] font-thin dark:text-[rgb(138,147,155)] font-poppins`,
    percentage: `text-[green] text-end font-poppins text-[15px]`,
    volume: `flex justify-center items-center text-[rgb(138,147,155)] dark:text-[rgb(138,147,155)] font-semibold text-[13px] font-poppins`
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <p className={styles.id}>{id}</p>
        <div className={styles.picture}>
          <Image src={image} layout='fill' objectFit='cover'/>
        </div>
        <div>
          <h2 className={styles.nameOfCollection}>{collectionName}</h2>
          <p className={styles.floorPrice}>Floor price: <FaEthereum/>{floorPrice}</p>
        </div>
      </div>
      <div>
        <p className={styles.percentage}>{percentage}</p>
        <p className={styles.volume}><FaEthereum/> {volume}</p>
      </div>
    </div>
  )
}

export default Collection