import React from 'react'
import Switch from "react-switch"
import {useState} from 'react'
import {useEffect} from 'react'



function ToggleButton({theme, setTheme}) {
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
    <>
      <Switch
          onChange={handleChange}
          checked={isNightMode}
          className="align-middle ml-[4px]"
        />
    </>
  )
}

export default ToggleButton