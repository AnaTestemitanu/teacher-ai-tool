import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import all the pages components from the 'pages' directory
import Dashboard from '../pages/Dashboard';
import ClassCreate from '../pages/ClassCreate';
import PreviousClasses from '../pages/PreviousClasses';
import FavouriteSlides from '../pages/FavouriteSlides';
import Marketplace from '../pages/Marketplace';
import AiChatAssistant from '../pages/AiChatAssistant';
import Support from '../pages/Support';


function RouterConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-class" element={<ClassCreate />} />
        <Route path="/previous-classes" element={<PreviousClasses />} />
        <Route path="/favourite-slides" element={<FavouriteSlides />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/ai-chat-assistant" element={<AiChatAssistant />} />
        <Route path="/support" element={<Support />} />
        {/* Default route */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default RouterConfig;