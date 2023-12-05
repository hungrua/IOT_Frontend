import React, { Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './Layout/Footer.js';
import Header from './Layout/Header.js';
import Map from './scenes/Map/Map.js';
import History from './scenes/History/History.js';
import Dashboard from './scenes/Dashboard/Dashboard.js';
import Login from './scenes/Login/Login.js';
import AdminCategories from './scenes/Admin/AdminManageUserTable.js';
import AdminCategoryDetail from './scenes/Admin/UserDetails.js';
const defaulUser = []
function App() {
  const [user, setUser] = useState(null)
  // useEffect(() => {
  //   let loggedInUser = localStorage.getItem('user');
  //   if(loggedInUser==undefined) setUser(null)
  //   else loggedInUser = JSON.parse(localStorage.getItem('user'))
  //   console.log(loggedInUser)
  //   if (loggedInUser) {
  //     setUser(loggedInUser);
  //   }
  // }, []);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setUser(items);
    }
  }, []);

  useEffect(() => {
    if (user !== defaulUser) { // Note we're checking *object identity* here
      localStorage.setItem("items", JSON.stringify(user));
    }
  }, [user]);
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };
  return (
    <div className="App" style={{ padding: 0, margin: 0, backgroundColor: "#424f5e" }}>
      <div className='con1'>
        <main className='mainContainer d-flex' >
          <Routes>
            {user !== null ? (<>
              <Route path='/history' element={<History choose="history"></History>}></Route>
              <Route path='/map' element={<Map choose="map"></Map>}></Route>
              <Route path='/dashboard' element={<Dashboard choose="dashboard"></Dashboard>}></Route>
              {
                user.role === 'admin' && (<>
                  <Route path='/admin/users' element={<AdminCategories />} />
                  <Route path='/admin/users/:username' element={<AdminCategoryDetail />} />
                </>)
              }

            </>) : (<>
              <Route path='/*' element={<Login onLogin={handleLogin} ></Login>}></Route>
            </>)}
          </Routes>
        </main>
      </div> :

    </div>
  );
}
export default App;
