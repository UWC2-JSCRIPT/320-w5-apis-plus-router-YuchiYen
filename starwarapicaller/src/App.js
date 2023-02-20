import './App.css';
//import React, { useEffect, useState } from 'react'
//import { Route, Routes, Link, useLocation, useParams } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import SingleCharacter from './SingleCharacter';
import AllCharacters from './AllCharacters';

function App() {
  return (
    <div className="">
      <AllCharacters />
      <Routes>
           <Route path="characterDetail/:charId" element={<SingleCharacter/>} />          
        </Routes>
    </div>
  )
}

export default App;
