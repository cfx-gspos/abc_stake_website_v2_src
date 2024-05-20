import Image from 'next/image'
import logo from '../../public/logo.jpg'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-black backdrop-blur-sm border-b border-b-stone-900">
      <div className="py-4 px-2 flex justify-between items-center flex-wrap gap-y-4 mx-auto md:max-w-5xl md:px-4">
        <Link href="/">
          <Image src={logo} alt="logo" height={48} priority={true}></Image>
        </Link>

        <ConnectButton
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full'
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true
          }}
        ></ConnectButton>
      </div>
    </header>
  )
}
