import React from 'react';
import { Link } from 'react-router-dom';


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
    return (
        <div className="menu">
            <div className="logo">
                <BiBookAlt className="logo-icon" />
                <h2>Turing Teaching</h2>
            </div>

            <div className="menu--list">
            <Link to="/dashboard" className="item">
                <BiHome className="icon" />
                Dashboard 
                </Link>
                <Link to="/create-class" className="item">
                <BiTask className="icon" />
                Create class
                </Link>
                <Link to="#" className="item">
                <BiHistory className="icon" />
                Previous classes 
                </Link>
                <Link to="#" className="item">
                <BiSlideshow className="icon" />
                Favourite Slides
                </Link>
                <Link to="#" className="item">
                <BiSolidShoppingBags className="icon" />
                Marketplace
                </Link>
                <Link to="#" className="item">
                <BiMessage className="icon" />
                Chat to AI assistant 
                </Link>
                <Link to="#" className="item">
                <BiHelpCircle className="icon" />
                Support 
                </Link>
            </div>
        </div>
    );
};

export  default Sidebar;