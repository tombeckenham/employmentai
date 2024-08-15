'use client'

import { useEffect } from 'react'

export const HeaderScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const headerBg = document.getElementById('header-bg')
      if (headerBg) {
        headerBg.style.opacity = window.scrollY > 10 ? '1' : '0'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
