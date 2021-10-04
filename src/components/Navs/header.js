import React from 'react'
import './style.css'

const Header = () => {
    return (
        <div className="header">
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand header-text">
                    <h1>Servers List</h1>
                </a>
            </nav>
        </div>
    )
}

export default Header;