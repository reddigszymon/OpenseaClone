import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ElasticCarousel from './ElasticCarousel';


const styles = {
    liveButton: `absolute font-poppins right-0 top-0 text-white text-[16px] mt-[.5em] mr-[1em] border-2 px-3 py-[.5px] rounded-xl font-semibold bg-[#00000033]`,
    title: `absolute bottom-[80px] ml-[20px] text-white font-poppins text-[20px] font-semibold`,
    subTitle: `font-poppins text-sm absolute bottom-[35px] text-white text-start ml-[20px]`
}


class CarouselComponent extends Component {
    render() {
        return (
            <div className="p-5 w-full mx-auto">
                <div className="lg:hidden">
                    <ElasticCarousel itemsToRender={1} itemPadding={[0,0]}/>
                </div>
                <div className="hidden lg:block xl:hidden">
                    <ElasticCarousel itemsToRender={2} itemPadding={[0,0]}/>
                </div>
                <div className="hidden xl:block">
                    <ElasticCarousel itemsToRender={3} itemPadding={[0,10]}/>
                </div>
            </div>
        );
    }
};
export default CarouselComponent