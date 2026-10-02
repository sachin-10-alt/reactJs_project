import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`relative py-16 ${darkMode ? 'bg-dark-950' : 'bg-light-50'}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${
        darkMode ? 'bg-linear-to-r from-transparent via-accent-400/20 to-transparent' : 'bg-linear-to-r from-transparent via-accent-400/10 to-transparent'
      }`} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <a href="#" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-accent-400 to-cyan-400 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-dark-900'}`}>
              EMI<span className="gradient-text">Pro</span>
            </span>
          </a>

          <p className={`text-sm max-w-md mx-auto mb-8 ${
            darkMode ? 'text-light-400/50' : 'text-dark-500/50'
          }`}>
            Smart EMI calculations at your fingertips. Free, fast, and beautifully designed
            for modern financial planning.
          </p>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {['Calculator', 'Analysis', 'Schedule', 'FAQ'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm transition-colors ${
                  darkMode ? 'text-light-400/40 hover:text-accent-400' : 'text-dark-500/40 hover:text-accent-500'
                }`}
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className={`h-px mb-6 ${
            darkMode ? 'bg-white/5' : 'bg-dark-900/5'
          }`} />

          <p className={`text-xs ${darkMode ? 'text-light-400/30' : 'text-dark-500/30'}`}>
            © {new Date().getFullYear()} EMIPro. Built with ♥ for smarter financial decisions.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
