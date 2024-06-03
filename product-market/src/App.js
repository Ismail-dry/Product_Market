// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <Sidebar />
          <Content />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;