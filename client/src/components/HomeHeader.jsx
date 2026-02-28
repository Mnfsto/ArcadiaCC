import Logo from "./Logo"
import { Link } from "react-router-dom";


const HomeHeader = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/" aria-label="Home">
                        <Logo />
                    </Link>
                </div>
                <nav className="header__nav">
                    <ul className="menu">
                        <li className="menu__link"><a href="/">Home</a></li>
                        <li className="menu__link"><a href="/about">About</a></li>
                        <li className="menu__link"><a href="/forkids">For Kids</a></li>
                        <li className="menu__link"><a href="/">Shop</a></li>
                    </ul>
                </nav>
                <div className="header__social-links">
                    <a href="https://www.facebook.com/ArcadiaCyclingClub" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook-f"><img src="/icons/Facebook.svg" alt="Facebook" width={24} height={24} /></i>
                    </a>
                    <a href="https://www.instagram.com/arcadia_cycling_club/" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"><img src="/icons/Instagram.svg" alt="Instagram" width={24} height={24} /></i>
                    </a>
                </div>

            </div>
        </header>
    )
}

export default HomeHeader