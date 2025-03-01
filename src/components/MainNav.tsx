import { NavLink } from "react-router-dom"
import { ArrowLeft, List, UserCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const MainNav = () => {
    // States
    const [showMenu, setShowMenu] = useState(false);

    const { user, logout } = useAuth();

    const toggleMobileMenu = () => {
        setShowMenu(!showMenu);
    }

    return <>
        <div className={`flex flex-col-reverse justify-center absolute top-0 start-0 end-14 bottom-16 z-10  bg-blue-mid drop-shadow 
        md:static md:flex-row md:justify-between  ${showMenu ? '' : 'hidden md:flex'}`}>

            <ul className={`flex flex-col justify-center p-16 md:flex-row md:justify-start md:p-2 md:ps-12 ${showMenu ? '' : 'hidden md:flex'}`}>
                <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/" onClick={toggleMobileMenu}>Startsida</NavLink></li>
                <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/about" onClick={toggleMobileMenu}>Om sidan</NavLink></li>
                <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/blog" onClick={toggleMobileMenu}>Blogg</NavLink></li>
                <li className="my-2 text-xl hover:text-blue-light md:me-8 md:text-base"><NavLink to="/profile" onClick={toggleMobileMenu}>Profil</NavLink></li>

            </ul >

            <hr className="mt-4 md:hidden" />
            {
                !user ?
                    <NavLink to="/login" onClick={toggleMobileMenu} className="hover:text-blue-light">Logga in</NavLink>
                    :
                    <div className="flex content-center justify-between items-center px-16 font-bold text-sm">
                        <div className="flex items-center">
                        <UserCircle size={24} />
                        <span className="ms-2 me-4">{user.name}</span>
                        </div>
                        <div className="flex items-center">
                        <p className="pe-2 text-sm font-light">Inte du?</p> 
                        <button onClick={logout} className="text-sm hover:text-blue-light">Logga ut</button>
                        </div>

                    </div>

            }

        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-pink-mid flex p-2 ps-12 md:hidden">
            <button onClick={toggleMobileMenu}>{!showMenu && <List />}{showMenu && <ArrowLeft />}</button>
        </div>
    </>
}

export default MainNav
