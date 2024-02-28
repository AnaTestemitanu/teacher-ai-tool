import React from 'react';
import Content from '../components/Content';
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    return (
    <div className="dashboard">
        <Sidebar />
        <div className="dashboard--content">
        <Content />
        <Profile />
        </div>
    </div>
    );
};

export default Dashboard;