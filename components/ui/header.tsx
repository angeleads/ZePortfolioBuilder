'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-green-50 backdrop-blur-sm shadow-sm' : ''}`}>
      <div className="max-w-8xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-2 mt-2">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link href="/" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Inicio</Link>
              </li>
              <li>
                <Link href="/about" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Quiénes somos</Link>
              </li>
              <li>
                <Link href="/contact" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Contacto</Link>
              </li>
              <li>
                <Link href="/privacy" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Política de privacidad</Link>
              </li>
            </ul>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
