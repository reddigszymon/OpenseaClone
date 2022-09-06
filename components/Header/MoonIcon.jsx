import React, {useEffect, useState} from 'react'
import {FaRegMoon} from 'react-icons/fa'
import { useTheme } from 'next-themes'

const styles = {
    moonIcon: `text-black ml-[40px] text-[32px] hover:text-[#8a939b] 2xl:ml-[50px]  dark:text-[#8a939b] dark:hover:text-white`,
    sunIcon: `text-black ml-[40px] text-[30px] hover:text-[#8a939b] 2xl:ml-[50px]  dark:text-[#8a939b] dark:hover:text-white`
}

function MoonIcon() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

    const handleChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

  return (
    <div>
        <FaRegMoon onClick={handleChange} className={styles.moonIcon} />
    </div>
  )
}

export default MoonIcon