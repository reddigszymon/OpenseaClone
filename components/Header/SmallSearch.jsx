import React, { useEffect } from 'react'
import {IoIosArrowBack} from "react-icons/io"
import {useState, useRef} from 'react'
import {BsX} from "react-icons/bs"
import Router from 'next/router'

function SmallSearch({setSmallSearch, titles, fullData}) {
    const [text, setText] = useState('');
    const [searchedCollection, setSearchedCollection] = useState([])
    const [imageArray, setImageArray] = useState([])
    const [alldiv, setAllDiv] = useState()
    // const [display, setDisplay] = useState(false)
    
    const inputRef = useRef();

    const handleTextChange = (e) => {
        setText(e.target.value);
        checkText(e.target.value)
    }

    const checkText = (myText) => {
      let comparisonArray = []
      for (let i=0; i<titles.length; i++) {
        comparisonArray.push(titles[i].slice(0, text.length + 1))
      }
      let searchedCollections = []
      for (let i=0; i<comparisonArray.length; i++) {
        if (comparisonArray[i].toLowerCase() === myText.toLowerCase()) {
          searchedCollections.push(titles[i])
        }
      }
      setSearchedCollection(searchedCollections)
    }

    useEffect(() => {
      const imagesArray = []
      if (searchedCollection !== undefined) {
        for (let i=0; i<fullData.length; i++) {
          for (let j=0; j<searchedCollection.length; j++) {
            if (searchedCollection[j] === fullData[i].title) {
              imagesArray.push([fullData[i].title, fullData[i].imageUrl, fullData[i].contractAddress])
            }
          }
        }
      }
      setImageArray(imagesArray)
    }, [searchedCollection])
    

    useEffect(() => {
      if (imageArray !== undefined && imageArray.length >= 1) {
        const searchDivs = imageArray.map((image, index) => (
          <div style={{top: (index+1)*76 + "px"}}
          onClick={() => Router.push({pathname: `/collections/${image[2]}`})} 
          className="bg-white w-full flex items-center justify-start fixed h-[5rem] z-50 left-0 border-[1px] dark:bg-[rgb(4,17,29)] dark:border-none">
          <div className="flex items-center ml-[30px]">
            <div className="rounded-full overflow-hidden h-[60px] w-[60px] mr-[20px]">
              <img src={image[1]} />
            </div>
            <p className="text-black text-[20px] font-semibold font-poppins dark:text-white">{image[0]}</p>
          </div>
        </div>
        ))
        setAllDiv(searchDivs)

      }
    }, [imageArray, text])


    useEffect(() => {
      if (text === "") {
        setAllDiv("")
      }
    }, [text])

    function clearText() {
      setText('');
      inputRef.current.focus();
    }


  return (
    <>
      <div className="bg-white sm:hidden dark:bg-[#353840] w-full flex items-center fixed left-0 h-[5rem] z-50">
          <IoIosArrowBack className="text-2xl text-black dark:text-[#8A939B] m-2" onClick={() => {setSmallSearch(prev => !prev)}}/>
          <input ref={inputRef} autoFocus onChange={(e) => handleTextChange(e)} value={text} placeholder="Browse Collections" className="outline-none text-black dark:text-white font-normal outline-0 bg-transparent flex-1 text-lg"></input>
          {text.length > 0 && <BsX className="text-3xl text-black dark:text-[#8A939B] font-bold mr-[1em]" onClick={() => {clearText()}}/>}
      </div>
      {alldiv === undefined ? <div></div> : alldiv}
    </>
  )
}

export default SmallSearch