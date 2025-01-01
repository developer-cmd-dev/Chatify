import React,{useState} from 'react'
import { Spiral as Hamburger } from 'hamburger-react'


function HamburgerCom() {
    const [isOpen, setOpen] = useState(false)

    return (<Hamburger toggled={isOpen} color='white' size={20} toggle={setOpen} />)
}

export default HamburgerCom