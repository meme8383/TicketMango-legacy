import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import EventPage from './pages/EventPage';

import Navbar from './components/Navbar';
import EventList from './components/EventList';
import NewEvent from './pages/NewEvent';
import Ticket from './pages/Ticket';

function App() {
  const { user, loading } = useAuthContext(); // get user

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {loading ? (
          <></>
        ) : (
          <div className="pages">
            <Routes>
              <Route
                index
                element={user ? <Navigate to="/dashboard" /> : <Home />}
              />
              <Route
                path="dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              >
                <Route path="" element={<EventList />} />
              </Route>
              <Route path="events" element={<Outlet />}>
                <Route
                  path="new"
                  element={user ? <NewEvent /> : <Navigate to="/login" />}
                />
                <Route path=":id" element={<Outlet />}>
                  <Route path="" element={<EventPage />} />
                  <Route path="tickets" element={<Outlet />}>
                    <Route path={':ticketID'} element={<Ticket />} />
                  </Route>
                  <Route
                    path="edit"
                    element={user ? <NewEvent /> : <Navigate to="/login" />}
                  />
                </Route>
              </Route>
              <Route
                path="login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
