import React from 'react'
import Image from 'next/image'

function CollectionCard({banner, title, avatar}) {
    // xs:w-[50%] sm:w-[33%] lg:w-[25%] xl:w-[20%] 2xl:w-[16.66%]
// md
  return (
    <div>
        <div className="hover:dark:bg-[rgb(76,78,85)] transition-all duration-[400ms] h-[300px] w-full overflow-hidden pb-[20px] shadow-sm rounded-lg hover:shadow-md cursor-pointer dark:bg-[rgb(53,56,64)]">
            <div className="w-full h-[80%] overflow-hidden">
                <img src={banner} className="rounded-t-lg w-screen h-full object-cover hover:scale-[1.15] lg:hover:ease-in-out lg:duration-[400ms]"/>
            </div>
            <div className="relative h-[20%] w-full rounded-b-lg">
                <div className="absolute left-[5%] bottom-[5%]">
                    <div className="flex items-center">
                        <div className="bg-black w-[90px] h-[90px] border-4 rounded-lg dark:border-[rgb(53,56,64)]">
                            <img src={avatar} className="w-full h-full object-cover "/>
                        </div>
                        <div className="mt-[50px] ml-[20px] font-poppins font-semibold">
                            {title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CollectionCard