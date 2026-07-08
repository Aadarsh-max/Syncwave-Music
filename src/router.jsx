import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Room from './pages/Room.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile /> },
      { path: 'room/:roomId', element: <Room /> },
    ],
  },
  { path: '/login', element: <Login /> },
])

export default router