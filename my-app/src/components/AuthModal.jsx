import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function AuthModal() {
  const { authModal, closeModal, signIn, signUp } = useAuth();
  const { darkMode } = useTheme();
  
  const [isSignIn, setIsSignIn] = useState(authModal === 'signin');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state with context when modal opens
  useState(() => {
    setIsSignIn(authModal === 'signin');
  }, [authModal]);

  if (!authModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        await signIn({ email: formData.email, password: formData.password });
      } else {
        await signUp(formData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl ${
            darkMode ? 'glass-card-dark' : 'glass-card-light'
          }`}
        >
          {/* Header Gradient */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-accent-400 via-cyan-400 to-emerald-400" />
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-dark-900'}`}>
                {isSignIn ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button 
                onClick={closeModal}
                className={`p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-white/10 text-light-400' : 'hover:bg-dark-900/10 text-dark-500'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className={`text-sm mb-8 ${darkMode ? 'text-light-400' : 'text-dark-500'}`}>
              {isSignIn 
                ? 'Sign in to access your saved calculations and analysis.' 
                : 'Join EMIPro to track your loans and get detailed financial insights.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                    darkMode ? 'text-light-500' : 'text-dark-400'
                  }`}>Full Name</label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-3 rounded-xl outline-hidden border transition-all ${
                      darkMode 
                        ? 'bg-dark-800/50 border-white/10 text-white focus:border-accent-400/50' 
                        : 'bg-white border-dark-900/10 text-dark-900 focus:border-accent-400/50 shadow-sm'
                    }`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  darkMode ? 'text-light-500' : 'text-dark-400'
                }`}>Email Address</label>
                <input
                  type="email"
                  required
                  className={`w-full px-4 py-3 rounded-xl outline-hidden border transition-all ${
                    darkMode 
                      ? 'bg-dark-800/50 border-white/10 text-white focus:border-accent-400/50' 
                      : 'bg-white border-dark-900/10 text-dark-900 focus:border-accent-400/50 shadow-sm'
                  }`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  darkMode ? 'text-light-500' : 'text-dark-400'
                }`}>Password</label>
                <input
                  type="password"
                  required
                  className={`w-full px-4 py-3 rounded-xl outline-hidden border transition-all ${
                    darkMode 
                      ? 'bg-dark-800/50 border-white/10 text-white focus:border-accent-400/50' 
                      : 'bg-white border-dark-900/10 text-dark-900 focus:border-accent-400/50 shadow-sm'
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-rose-500 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-linear-to-r from-accent-400 to-cyan-400 text-white font-bold shadow-lg hover:shadow-accent-400/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className={`text-sm ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>
                {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                  onClick={handleToggle}
                  className="text-accent-400 font-bold hover:underline"
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
