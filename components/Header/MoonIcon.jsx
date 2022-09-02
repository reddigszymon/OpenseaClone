import React from 'react'
import {FaRegMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import {useState, useEffect} from 'react'

const styles = {
    moonIcon: `text-black ml-[40px] text-[32px] hover:text-[#8a939b] 2xl:ml-[50px]  dark:text-[#8a939b] dark:hover:text-white`,
    sunIcon: `text-black ml-[40px] text-[30px] hover:text-[#8a939b] 2xl:ml-[50px]  dark:text-[#8a939b] dark:hover:text-white`
}

function MoonIcon({theme, setTheme}) {

    const [isNightMode, setIsNightMode] = useState(false)

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme')
        if (currentTheme === 'light') {
          setIsNightMode(false)
        } else {
          setIsNightMode(true)
        }
    }, [theme])


    const handleChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

  return (
    <div>
        {theme === 'dark' ? <FiSun onClick={handleChange} className={styles.sunIcon}/> : <FaRegMoon onClick={handleChange} className={styles.moonIcon} />}
    </div>
  )
}

export default MoonIcon