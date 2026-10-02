import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { darkMode } = useTheme();
  const { user, signOut, openSignIn, openSignUp } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Calculator', href: '#calculator', icon: 'M9 7L5 12L9 17M15 7L19 12L15 17' },
    { label: 'Analysis', href: '#analysis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Schedule', href: '#schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'FAQ', href: '#faq', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Settings', href: '#settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          darkMode ? 'glass-dark' : 'glass-light'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar Trigger */}
            <motion.button
              onClick={toggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl transition-colors ${
                darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-dark-900/10 text-dark-900'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </motion.button>

            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent-400 to-cyan-400 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-lg font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-dark-900'
              }`}>
                EMI<span className="gradient-text">Pro</span>
              </span>
            </motion.a>
          </div>

          {/* Right side spacer */}
          <div className="w-10 md:w-20" />
        </div>
      </motion.nav>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-100 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="absolute inset-0 bg-dark-950/40 backdrop-blur-sm"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute top-0 left-0 h-full w-full max-w-[280px] shadow-2xl flex flex-col ${
                darkMode ? 'bg-dark-900 border-r border-white/5' : 'bg-white border-r border-dark-900/5'
              }`}
            >
              {/* Sidebar Header */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-accent-400 to-cyan-400 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-dark-900'}`}>
                    EMI<span className="gradient-text">Pro</span>
                  </span>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/5 text-light-400' : 'hover:bg-dark-900/5 text-dark-500'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* User Section (Inside Sidebar) */}
              {user && (
                <div className="px-6 py-8 border-b border-white/5 bg-linear-to-br from-accent-400/5 to-cyan-400/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent-400 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-dark-900'}`}>{user.name}</h3>
                      <p className={`text-xs ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={toggleSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      darkMode 
                        ? 'text-light-300 hover:text-white hover:bg-white/5' 
                        : 'text-dark-600 hover:text-dark-900 hover:bg-dark-900/5'
                    }`}
                  >
                    <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Bottom Section: Auth Actions */}
              <div className="p-6 border-t border-white/5">
                {user ? (
                  <button
                    onClick={() => { signOut(); toggleSidebar(); }}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => { openSignIn(); toggleSidebar(); }}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${
                        darkMode ? 'bg-white/5 text-white' : 'bg-dark-900/5 text-dark-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { openSignUp(); toggleSidebar(); }}
                      className="w-full py-3 rounded-xl bg-linear-to-r from-accent-400 to-accent-500 text-white font-bold shadow-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
