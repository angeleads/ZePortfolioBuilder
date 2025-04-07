import Link from "next/link";
import LogoPic from "@/public/images/logos/logo-white.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image
        src={LogoPic}
        priority={true}
        width={100}
        height={100}
        alt="Logo"
      />
    </Link>
  );
}
