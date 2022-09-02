import React from 'react'
import {AiFillPlayCircle} from "react-icons/ai"

const styles = {
    learnCircle: `cursor-pointer text-2xl mr-[.3em]`,
    learnMoreContainer: `relative text-[#2081e2] flex items-center lg:justify-start justify-center`,
    learnMoreText: `font-bold text-lg`

}

function LearnMore() {
  return (
    <div className={styles.learnMoreContainer}>
        <AiFillPlayCircle className={styles.learnCircle}/>
        <a className={styles.learnMoreText} href="https://opensea.io/#meetopensea">Learn more about OpenSea</a>
    </div>
  )
}

export default LearnMore