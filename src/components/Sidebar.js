import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
    BiHome, 
    BiBookAlt,
    BiMessage, 
    BiHistory, 
    BiSlideshow, 
    BiTask,
    BiSolidShoppingBags,
    BiHelpCircle
} from 'react-icons/bi';
import "../styles/sidebar.css"
import "../styles/dashboard.css"
import "../styles/content.css"

const Sidebar = () => {
    const location = useLocation(); // Get the current location

    const isActive = (path) => {
        return location.pathname === path; // Check if the current path matches the link path
    };

    return (
        <div className="menu">
            <div className="logo">
                <BiBookAlt className="logo-icon" />
                <h2>Turing Teaching</h2>
            </div>

            <div className="menu--list">
                <Link to="/dashboard" className={`item ${isActive('/dashboard') ? 'active' : ''}`}>
                    <BiHome className="icon" />
                    Dashboard 
                </Link>
                <Link to="/create-class" className={`item ${isActive('/create-class') ? 'active' : ''}`}>
                    <BiTask className="icon" />
                    Create class
                </Link>
                <Link to="/previous-classes" className={`item ${isActive('/previous-classes') ? 'active' : ''}`}>
                    <BiHistory className="icon" />
                    Previous classes 
                </Link>
                <Link to="/favourite-slides" className={`item ${isActive('/favourite-slides') ? 'active' : ''}`}>
                    <BiSlideshow className="icon" />
                    Favourite Slides
                </Link>
                <Link to="/marketplace" className={`item ${isActive('/marketplace') ? 'active' : ''}`}>
                    <BiSolidShoppingBags className="icon" />
                    Marketplace
                </Link>
                <Link to="/ai-chat-assistant" className={`item ${isActive('/ai-chat-assistant') ? 'active' : ''}`}>
                    <BiMessage className="icon" />
                    Chat to AI assistant 
                </Link>
                <Link to="/support" className={`item ${isActive('/support') ? 'active' : ''}`}>
                    <BiHelpCircle className="icon" />
                    Support 
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
