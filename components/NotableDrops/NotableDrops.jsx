import React from 'react'
import CarouselComponent from './CarouselComponent'
function NotableDrops() {
  return (
    <div className="dark:bg-[#202225]">
        <h2 className="font-poppins text-[24px] text-[#04111D] pt-[4em] lg:pt-[.5em] dark:bg-[#202225] dark:text-white font-semibold text-center mb-[2em]">Notable Drops</h2>
        <CarouselComponent />
    </div>
  )
}

export default NotableDrops