import React from 'react'
import { ThemeSwitch } from './ThemeSwitch'


const Navbar = () => {
    return (
        <div className='h-36 flex flex-col w-3/4'>
            <ul>
                <ThemeSwitch />
            </ul>
        </div>
    )
}

export default Navbar
