import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    const [user, setUser] = useState({
        name: null,
        email: null,
        travels: 0
    })

    return (
        <nav className="navbar">
            <p className="navbar-logo">TravelApp</p>

            <div className="nav-links">
                <Link className="nav-link" to="/">
                    Home        
                </Link>
                <Link className="nav-link" to="/publish">
                    Publish        
                </Link>
                <Link className="nav-link" to="/travels">
                    Travels        
                </Link>
            </div>

            <div className="profile-button">
                Profile
            </div>
        </nav>
    )
};

export default NavBar;