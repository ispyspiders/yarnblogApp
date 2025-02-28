import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>Moment 3 i kursen Fördjupad frontendutveckling skapad av <a href="mailto:kacl1200@student.miun.se">Kajsa Classon</a>, VT25.</footer>
        </>
    )
}

export default Layout