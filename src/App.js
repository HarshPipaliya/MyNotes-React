import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NotesState from './context/Notes/NotesState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alerts from './components/Alerts';
import { useState } from 'react';

export const NewContext = React.createContext()

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (type, messege) => {
    setAlert({
      type: type,
      messege: messege
    })

    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <NotesState>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alerts alert={alert} />
        <Routes>
          <Route exact path='/' element={<Home showAlert={showAlert} />} key={"home"}></Route>
          <Route exact path='/about' element={<About />} key={"about"}></Route>
          <Route exact path='/signup' element={<Signup showAlert={showAlert} />} key={"signup"}></Route>
          <Route exact path='/login' element={<Login  showAlert={showAlert} />} key={"login"}></Route>
        </Routes>
      </Router>
    </NotesState>
  );
}

export default App;
