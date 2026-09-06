import { Icon, LucideIcon } from 'lucide-react';
import React from 'react'

type Props ={
    name:string;
    icon:LucideIcon;
}



const Skillcard = ({icon:Icon, name}:Props) => {
  return (
    <div className='group relative bg-white dark:bg-indigo-500 shadow-md rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300'>
        <div className='w-12 h-12 rounded-lg bg-linear-to-br from-purple-400 to-blue-600 flex items-center justify-center group-hover:from-purple-300 group-hover:to-blue-600 transition-all duration-300'>
            <Icon className='w-6 h-6 text-white'/>
        </div>
        <span className='text-sm font-medium text-foreground'>{name}</span>
    </div>
  )
}

export default Skillcard