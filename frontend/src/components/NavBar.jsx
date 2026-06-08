import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`navbar${menuOpen ? ' navbar--open' : ''}`}>
            <NavLink className="navbar-logo" to="/" onClick={closeMenu}>
                TravelApp
            </NavLink>

            {/* Hamburger button — visible only on mobile */}
            <button
                className="navbar-hamburger"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
            >
                <span />
                <span />
                <span />
            </button>

            <div className="nav-links">
                <NavLink className="nav-link" to="/" end onClick={closeMenu}>
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/publish" onClick={closeMenu}>
                    Publish
                </NavLink>
                <NavLink className="nav-link" to="/travels" onClick={closeMenu}>
                    Travels
                </NavLink>
            </div>

            <div className="profile-button">
                Profile
            </div>
        </nav>
    );
};

export default NavBar;