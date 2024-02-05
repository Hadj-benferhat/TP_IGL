import { Routes, BrowserRouter as Router, Route }  from 'react-router-dom';
import {  useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Pages
import Home from './pages/Home/Home';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import NotFound from './pages/NotFound/NotFound';
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'; 
import DashboardMember from './pages/DashboardMember/DashboardMember'; 
import FaireDon from './pages/Dons/FaireDon'; 
import BesoinDon from './pages/Dons/BesoinDon'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.role === 'admin');
      setToken(token);
    }
  }, []);

  function handleLogin(token) {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setIsAdmin(decodedToken.role === 'admin');
    setUserName(decodedToken.name);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  }

  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inscription" element={<Inscription />} />
              <Route 
                path={(isAuthenticated && isAdmin) ? "/connexion/*" : "/connexion"}
                element={isAuthenticated ? 
                          isAdmin ? 
                              <DashboardAdmin  token={token} userName = {userName} handleLogout = { handleLogout } />
                              : <DashboardMember token={token} userName = {userName} handleLogout = { handleLogout } /> 
                              : <Connexion handleLogin = { handleLogin } />
                        }
              />
            <Route path="/faireDon" element={<FaireDon />} />
            <Route path="/besoinDon" element={<BesoinDon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
  );
}
export default App;