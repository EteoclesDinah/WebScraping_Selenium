import React from "react";
import './App.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HeaderSection = () => {
    return (
        <header className="header">
            <div className="logo">
                <img 
                src="" 
                alt=""/>
            </div>
            <nav className="nav-bar">
                <ul>
                <li>
                    <NavLink to="" exact activeClassName="active">
                    <FontAwesomeIcon icon={faArrowLeft} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Home" exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/About" activeClassName="active">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Services" activeClassName="active">
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contact" activeClassName="active">
                            Contact
                        </NavLink>
                    </li>
                    
                    
                </ul>
            </nav>
        </header>
    );
};

export default HeaderSection;