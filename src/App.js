import React, { Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './Layout/Footer.js';
import Header from './Layout/Header.js';
import Map from './scenes/Map/Map.js';
import History from './scenes/History/History.js';
import Dashboard from './scenes/Dashboard/Dashboard.js';
import Login from './scenes/Login/Login.js';
function App() {
  const [display, setDisplay] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    console.log(loggedInUser)
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);
  return (
    <div className="App" style={{ padding: 0, margin: 0, backgroundColor: "#424f5e" }}>
      {user !== null ? (<div className='con1'>
          <React.Fragment>
            <Suspense fallback={<div>loading...</div>}>
              <main className='mainContainer d-flex' >
                <Routes>
                  <Route path='/history' element={<History></History>}></Route>
                  <Route path='/map' element={<Map></Map>}></Route>
                  <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
                </Routes>
              </main>
            </Suspense>
          </React.Fragment>
      </div>) : (<Login></Login>)
      }
      {/* <div className='con2' style={{ height: "100vh", display: "flex", width: "100vw" }}>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
        </Routes>
      </div> */}


    </div>
  );
}
export default App;
