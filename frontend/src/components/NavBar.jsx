import React, { useState } from 'react';
import './NavBar.css'

const NavBar = () => {
    const [user, setUser] = useState({
        name: null,
        email: null,
        travels: 0
    })

    return (
        <nav className="navbar">
            <p>TravelApp</p>
            <ul className="nav-links">
                <li>Home</li>
                <li>Publish Travel Plan</li>
                <li>Travel Plans</li>
            </ul>
            <div>
                Profile
            </div>
        </nav>
    )
};

export default NavBar;