import React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes />
        <ToastContainer position="top-center" />
    </div>
    </BrowserRouter>
  );
}

export default App;
