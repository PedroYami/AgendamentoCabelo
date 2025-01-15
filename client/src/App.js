import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import Schedule from './pages/schedule';
import ScheduleList from './pages/scheduleList';
import BookSchedule from './pages/bookSchedule';
import Waitlist from './pages/waitList';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/:userId" element={<Home />} />
          <Route path="/schedule/" element={<Schedule />} />
          <Route path="/scheduleList/:userId" element={<ScheduleList />} />
          <Route path="/book/:userId" element={<BookSchedule />} />
          <Route path="/waitlist/:userId" element={<Waitlist />} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
