import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import PlayerBar from './components/player/PlayerBar.jsx'

export default function App() {
  const location = useLocation()

  if (location.pathname === '/login') return <Outlet />

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0a]">
      <Sidebar />
      <div className="flex flex-col min-w-0 flex-1 ml-[240px]">
        <Topbar />
        <main className="flex-1 overflow-y-auto pb-[90px]">
          <Outlet />
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}