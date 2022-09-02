import React from 'react'
import Carousel from 'react-elastic-carousel'

const styles = {
    liveButton: `absolute font-poppins right-0 top-0 text-white text-[16px] mt-[.5em] mr-[1em] border-2 px-3 py-[.5px] rounded-xl font-semibold bg-[#00000033]`,
    title: `absolute bottom-[80px] ml-[20px] text-white font-poppins text-[20px] font-semibold`,
    subTitle: `font-poppins text-xs sm:text-sm absolute bottom-[20px] sm:bottom-[35px] text-white text-start ml-[20px]`
}

function ElasticCarousel({itemsToRender, itemPadding}) {
  return (
    <div className='w-full lg:max-w-[1100px] xl:max-w-[1300px] mx-auto'>
        <Carousel itemsToShow={itemsToRender} itemPadding={itemPadding}>
            <div className="relative bg-moon-owl bg-cover h-[400px] w-[300px] sm:h-[500px] sm:w-[400px] rounded-lg">
                <div className={styles.liveButton}>Live</div>
                <div className={styles.title}>Moon Owls NFT</div>
                <div className={styles.subTitle}>Artistic pieces that express an idea, emotion, or a world view.</div>
            </div>
            <div className="relative bg-moodies-nft h-[400px] w-[300px] sm:h-[500px] sm:w-[400px] bg-cover rounded-lg">
                <div className={styles.liveButton}>Live</div>
                <div className={styles.title}>Moodies by Hanuka</div>
                <div className={styles.subTitle}>A 7,401 pieces celebration of emotional complexity</div>
            </div>
            <div className="relative bg-celebrating-nft h-[400px] w-[300px] sm:h-[500px] sm:w-[400px] bg-cover rounded-lg bg-center">
                <div className={styles.liveButton}>Live</div>
                <div className={styles.title}>FAKE IT TILL YOU MAKE IT</div>
                <div className={styles.subTitle}>Scrutinizing wellness and confidence culture on social media.</div>
            </div>
            <div className="relative bg-ice-nft h-[400px] w-[300px] sm:h-[500px] sm:w-[400px] bg-cover rounded-lg">
                <div className={styles.liveButton}>Live</div>
                <div className={styles.title}>The Metascapes</div>
                <div className={styles.subTitle}>AI landscape images bridging the natural and the supernatural.</div>
            </div>
            
        </Carousel>
    </div>
  )
}

export default ElasticCarousel