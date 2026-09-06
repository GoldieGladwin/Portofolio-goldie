
import { Navlinks } from '@/Constant/Constant'
import Link from 'next/link'
import { X } from 'lucide-react'


type Props = {
    showNav: boolean;
    closeNav: () => void;
}

const MobileNav = ({ showNav, closeNav }: Props) => {

    const sidebarOpenClose = showNav ? "translate-x-0":"translate-x-[-100%]";



  return (
    <div>
        {/* overlay */}
        <div className={`fixed ${sidebarOpenClose} inset-0 transform transition-all duration-500 z-1002 bg-black opacity-70 w-fulll h-screen `}></div>

        {/* navlinks */}
        <div className={`text-white ${sidebarOpenClose} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-indigo-700 space-y-6 z-1050 `}>
            {Navlinks.map((link, index) => {
                return <Link key={index} href={link.href}>
                    <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px pb-1 sm:text-[30%]">
                    {link.name}
                    </p>
                </Link>
                
            })}
            {/* close icon */}
            <X onClick={closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"/>
        </div>
    </div>
  )
}

export default MobileNav