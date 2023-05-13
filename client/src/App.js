import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'
import EventList from './components/EventList'
import NewEvent from './pages/NewEvent'

function App () {
  const { user, loading } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {loading ? <></> :
          <div className="pages">
            <Routes>
              <Route
                index
                element={user ? <Navigate to="/dashboard" /> :
                  <Home />}
              />
              <Route
                path="dashboard"
                element={user ? <Dashboard /> : <Navigate
                  to="/login" />}
              >
                <Route path="" element={<EventList />} />
              </Route>
              <Route path="events"
                     element={user ? <Outlet /> : <Navigate to="/login" />}>
                <Route path="new" element={<NewEvent />} />
                <Route path=":eventId" element={<EventList />} />
              </Route>
              <Route
                path="login"
                element={!user ? <Login /> : <Navigate
                  to="/" />}
              />
              <Route
                path="signup"
                element={!user ? <Signup /> : <Navigate
                  to="/" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        }
      </BrowserRouter>
    </div>
  )
}

export default App
