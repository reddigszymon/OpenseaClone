import React from 'react'
import YoutubeVideo from './YoutubeVideo'
import YoutubeVideoTwo from './YoutubeVideoTwo'
import YoutubeVideoThree from './YoutubeVideoThree'

function MeetOpensea() {
  return (
    <div className="bg-[rgb(243,251,254)] dark:bg-[rgb(38,43,47)] pb-[4em] xl:pb-[10em]">
        <h1 className="text-[24px] pt-[1em] text-center font-bold font-poppins mb-[1em] lg:text-[28px]">Meet OpenSea</h1>
        <p className="text-[16px] text-center font-poppins mb-[2em] lg:text-[20px]">The NFT marketplace with everything<br/>for everyone</p>
        <div className="lg:hidden">
            <YoutubeVideo />
        </div>
        <div className="hidden lg:block xl:hidden">
            <YoutubeVideoTwo />
        </div>
        <div className="hidden xl:block">
            <YoutubeVideoThree />
        </div>
    </div>
  )
}

export default MeetOpensea