import Link from 'next/link'
import WhiteLogoPic from '@/public/images/logos/logoCar_whiteCar_noBg.png' 
import Image from 'next/image'

export default function WhiteLogo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image src={WhiteLogoPic} width={100} height={100} alt="WhiteLogo" />
    </Link>
  )
}
