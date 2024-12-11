import Logo from './logo'

export default function WFooter() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-8 gap-3 py-8 md:py-12 border-t border-gray-200">

          {/* Project */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2 pl-14">
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              <a href="/" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">SharetoGo</a> · <a href="/privacy" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Políticas de privacidad</a>
            </div>
          </div>

          {/* Page links */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">SharetoGo</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a href="/" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Home</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Quiénes somos</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Contacto</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Políticas de privacidad</a>
              </li>
            </ul>
          </div>

          {/* Subscription */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a href="#"
                className="w-full sm:w-auto bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                  </path>
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Descarga desde la</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#"
                className="w-full sm:w-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                  </path>
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Consiguelo en</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

          {/* Social as */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a href="https://www.instagram.com/sharetogo_/?igshid=MjEwN2IyYWYwYw%3D%3D" className="flex justify-center items-center text-gray-600 hover:text-green-900 focus:text-green-800" aria-label="Instagram">
              <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0ZM12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.886 2.886 0 0 0-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.91 2.91 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.912 2.912 0 0 0-.703-1.08a2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4Zm0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122c0 2.717-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.884 4.884 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06c-2.717 0-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.89 4.89 0 0 1-1.772-1.153a4.905 4.905 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428c-.048-1.066-.06-1.405-.06-4.122c0-2.717.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772a4.897 4.897 0 0 1 1.772-1.153c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2Z"/>
              </svg>
              </a>
            </li>
            <li className="ml-4">
              <a href="https://www.tiktok.com/@share2go" className="flex justify-center items-center text-gray-600 hover:text-green-900 focus:text-green-800" aria-label="Tiktok">
                <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
                </svg>
              </a>
            </li>
            <li className="ml-4">
              <a href="https://twitter.com/Sharetogo_" className="flex justify-center items-center text-gray-600 hover:text-green-900 focus:text-green-800" aria-label="Twitter">
                <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"/>
                </svg>
              </a>
            </li>
          </ul>

          <div className="text-sm text-gray-600 mr-4">&copy; sharetogo.org. All rights reserved.</div>

        </div>

      </div>
    </footer>
  )
}
