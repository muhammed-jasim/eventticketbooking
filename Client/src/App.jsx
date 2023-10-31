import React from 'react'
import {    Route, Routes } from 'react-router-dom';
import EventList from './components/AdminPanel'
import UserPage from './components/Userpage';

function App() {
  return (
    <Routes>
   

        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<EventList />} />
     
  
  </Routes>
  )
}

export default App
