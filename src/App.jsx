import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import PlayerBar from './components/player/PlayerBar.jsx'
import BottomNav from './components/layout/BottomNav.jsx'
import { ToastContainer } from './components/ui/Toast.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'
import { RoomProvider } from './context/RoomContext.jsx'
import useToast from './hooks/useToast.js'

export default function App() {
  const location = useLocation()
  const { toasts, removeToast } = useToast()

  if (location.pathname === '/login') return <Outlet />

  return (
    <PlayerProvider>
      <RoomProvider>
        <div
          className="flex h-screen w-screen overflow-hidden bg-[#06060f] text-white"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden md:ml-[240px]">
            <Topbar />
            <main className="flex-1 overflow-y-auto pb-[140px] md:pb-[90px]">
              <Outlet />
            </main>
          </div>
          <PlayerBar />
          <BottomNav />
          <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
      </RoomProvider>
    </PlayerProvider>
  )
}