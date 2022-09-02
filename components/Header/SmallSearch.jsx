import React from 'react'
import {IoIosArrowBack} from "react-icons/io"
import {useState, useRef} from 'react'
import {BsX} from "react-icons/bs"

function SmallSearch({setSmallSearch}) {
    const [text, setText] = useState('');
    
    const inputRef = useRef();

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    function clearText() {
      setText('');
      inputRef.current.focus();
    }


  return (
    <div className="bg-white sm:hidden dark:bg-[#353840] w-full flex items-center fixed left-0 h-[5rem] z-50">
        <IoIosArrowBack className="text-2xl text-black dark:text-[#8A939B] m-2" onClick={() => {setSmallSearch(prev => !prev)}}/>
        <input ref={inputRef} autoFocus onChange={handleTextChange} value={text} placeholder="Search OpenSea" className="outline-none text-black dark:text-white font-normal outline-0 bg-transparent flex-1 text-lg"></input>
        {text.length > 0 && <BsX className="text-3xl text-black dark:text-[#8A939B] font-bold mr-[1em]" onClick={() => {clearText()}}/>}
    </div>
  )
}

export default SmallSearch