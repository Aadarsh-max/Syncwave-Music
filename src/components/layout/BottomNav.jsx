import { NavLink } from 'react-router-dom'
import { HiHome, HiSearch, HiCollection, HiSparkles, HiUser } from 'react-icons/hi'

const tabs = [
  { to: '/', icon: HiHome, label: 'Home', exact: true },
  { to: '/search', icon: HiSearch, label: 'Search' },
  { to: '/library', icon: HiCollection, label: 'Library' },
  { to: '/grow', icon: HiSparkles, label: 'Grow' },
  { to: '/profile', icon: HiUser, label: 'Profile' },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-17.5 left-0 right-0 flex items-center justify-around px-2 py-2 z-40 md:hidden"
      style={{
        background: 'rgba(8,8,16,0.95)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {tabs.map(({ to, icon: Icon, label, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className="no-underline flex-1"
          style={{ textDecoration: 'none' }}
        >
          {({ isActive }) => (
            <div
              className="flex flex-col items-center gap-1 py-1 rounded-xl transition-all duration-200"
              style={{ opacity: isActive ? 1 : 0.5 }}
            >
              <Icon
                size={22}
                style={{
                  color: isActive ? '#1DB954' : '#6a6a7a',
                  filter: isActive ? 'drop-shadow(0 0 6px #1DB95480)' : 'none',
                }}
              />
              <span
                className="text-[10px] font-bold"
                style={{ color: isActive ? '#1DB954' : '#6a6a7a' }}
              >
                {label}
              </span>
              {isActive && (
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: '#1DB954', boxShadow: '0 0 6px #1DB954' }}
                />
              )}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}