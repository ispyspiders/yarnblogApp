import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <ul>
            <li><NavLink to="/">Startsida</NavLink></li>
            <li><NavLink to="/about">Om sidan</NavLink></li>
            <li><NavLink to="/blog">Blogg</NavLink></li>
        </ul>
    </header>
  )
}

export default Header