import { NavLink } from "react-router-dom"
import { ArrowLeft, List } from "@phosphor-icons/react"
import { useState } from "react"

const MainNav = () => {
    // States
    const [showMenu, setShowMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMenu(!showMenu);
    }

    return <>
        <ul className={`flex flex-col justify-center absolute top-0 start-0 end-14 bottom-16 z-10 p-16 bg-blue-mid drop-shadow md:static md:flex-row md:justify-start md:p-2 md:ps-12 ${showMenu ? '' : 'hidden md:flex'}`}>
            <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/">Startsida</NavLink></li>
            <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/about">Om sidan</NavLink></li>
            <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/blog">Blogg</NavLink></li>
            <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/profile">Profil</NavLink></li>
            <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/login">Logga in</NavLink></li>
        </ul >

        <div className="absolute inset-x-0 bottom-0 h-16 bg-pink-mid flex p-2 ps-12 md:hidden">
            <button onClick={toggleMobileMenu}>{!showMenu && <List />}{showMenu && <ArrowLeft />}</button>
        </div>
    </>
}

export default MainNav
