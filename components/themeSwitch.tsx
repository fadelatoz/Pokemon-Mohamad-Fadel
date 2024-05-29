// app/components/ThemeSwitch.tsx
'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  console.log(resolvedTheme)


  if (resolvedTheme === 'dark') {
    return <FiSun className="cursor-pointer ml-20" color="red" onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <FiMoon className="cursor-pointer ml-20 " color="black" onClick={() => setTheme('dark')} />
  }

}