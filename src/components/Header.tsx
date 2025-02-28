import { NavLink } from "react-router-dom"
import Logo from '../assets/logo.svg'

const Header = () => {
  return (
    <header className="bg-pink-deep p-2">
      <NavLink to="/"><img src={Logo} alt="" className="m-4" /></NavLink>

    </header>
  )
}

export default Header