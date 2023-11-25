import React, { Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './Layout/Footer.js';
import Header from './Layout/Header.js';
import Map from './scenes/Map/Map.js';
import History from './scenes/History/History.js';
import Dashboard from './scenes/Dashboard/Dashboard.js';
import Login from './scenes/Login/Login.js';
import AdminUsersTable from './scenes/Admin/AdminUserTable.js';
import AdminCategories from './scenes/Admin/AdminManageUserTable.js';
import AdminCategoryDetail from './scenes/Admin/UserDetails.js';
function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    let loggedInUser = sessionStorage.getItem('user');
    if(loggedInUser==undefined) setUser(null)
    else loggedInUser = JSON.parse(sessionStorage.getItem('user'))
    console.log(loggedInUser)
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    sessionStorage.setItem('user', JSON.stringify(loggedInUser));
  };
  return (
    <div className="App" style={{ padding: 0, margin: 0, backgroundColor: "#424f5e" }}>
      <div className='con1'>
        <main className='mainContainer d-flex' >
          <Routes>
            {user!==null?(<>
              <Route path='/history' element={<History choose="history"></History>}></Route>
              <Route path='/map' element={<Map choose="map"></Map>}></Route>
              <Route path='/dashboard' element={<Dashboard choose="dashboard"></Dashboard>}></Route>
              {
                user.role==='admin' && (<>
                  <Route path='/admin/users' element={<AdminCategories />} />
                  <Route path='/admin/users/:username' element={<AdminCategoryDetail />} />
              </>)
              }

            </>):(<>
                <Route path='/*' element={<Login onLogin ={handleLogin} ></Login>}></Route>             
            </>)}
          </Routes>
        </main>
      </div> :

    </div>
  );
}
export default App;
