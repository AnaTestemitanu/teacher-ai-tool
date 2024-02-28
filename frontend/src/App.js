import './App.css';
import "../styles/sidebar.css"
import "../styles/dashboard.css"
import "../styles/content.css"

import React from 'react';

const App = ({ children }) => {
    return (
    <div className="dashboard">
        {children}
    </div>
    );
};

export default App;