import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsSection() {
  const { user, updateProfile, updatePassword, openSignIn } = useAuth();
  const { darkMode } = useTheme();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState(user?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  // Update editable name if user context changes
  useState(() => {
    if (user?.name) setEditableName(user.name);
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!editableName.trim()) return;
    
    setIsUpdating(true);
    try {
      await updateProfile({ name: editableName });
      setIsEditingName(false);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    setIsUpdating(true);
    try {
      await updatePassword(newPassword);
      setStatus({ type: 'success', message: 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section id="settings" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-dark-900'}`}>
            Account <span className="gradient-text">Settings</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-light-400' : 'text-dark-500'}`}>
            Manage your profile information and account security.
          </p>
        </motion.div>

        {!user ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`max-w-xl mx-auto p-12 rounded-3xl text-center shadow-2xl ${
              darkMode ? 'glass-card-dark' : 'glass-card-light'
            }`}
          >
            <div className="w-20 h-20 rounded-2xl bg-accent-400/10 flex items-center justify-center mx-auto mb-6 text-accent-400">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-dark-900'}`}>Sign in Required</h3>
            <p className={`mb-8 ${darkMode ? 'text-light-400' : 'text-dark-500'}`}>Please sign in to view and manage your account settings.</p>
            <button
              onClick={openSignIn}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-accent-400 to-accent-500 text-white font-bold shadow-lg shadow-accent-400/20 hover:scale-105 active:scale-95 transition-all"
            >
              Sign In Now
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`max-w-3xl mx-auto p-10 rounded-3xl shadow-2xl overflow-hidden relative ${
              darkMode ? 'glass-card-dark' : 'glass-card-light'
            }`}
          >
            {/* Header Deco */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-400 via-cyan-400 to-emerald-400" />
            
            <h3 className={`text-2xl font-bold mb-10 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-dark-900'}`}>
              <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center text-accent-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Personal Security Profile
            </h3>
            
            <div className="space-y-8">
              {/* Name Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className={`block text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>Full Name</label>
                  {!isEditingName && (
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="text-sm text-accent-400 font-bold hover:underline py-1"
                    >
                      Edit Name
                    </button>
                  )}
                </div>
                
                {isEditingName ? (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <input
                      type="text"
                      className={`w-full px-5 py-4 rounded-xl outline-hidden border transition-all text-lg font-medium ${
                        darkMode 
                          ? 'bg-dark-800 border-white/10 text-white focus:border-accent-400' 
                          : 'bg-white border-dark-900/10 text-dark-900 focus:border-accent-400 shadow-sm'
                      }`}
                      value={editableName}
                      onChange={(e) => setEditableName(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-3">
                      <button 
                        onClick={handleProfileUpdate}
                        disabled={isUpdating}
                        className="px-6 py-2.5 rounded-xl bg-accent-400 text-white font-bold hover:bg-accent-500 transition-all shadow-md active:scale-95 disabled:opacity-50"
                      >
                        {isUpdating ? 'Saving...' : 'Save Name'}
                      </button>
                      <button 
                        onClick={() => { setIsEditingName(false); setEditableName(user.name); }}
                        className={`px-6 py-2.5 rounded-xl font-bold border transition-all active:scale-95 ${
                          darkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-dark-900/10 text-dark-900 hover:bg-dark-900/5'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className={`px-5 py-5 rounded-2xl border text-lg font-bold shadow-sm ${
                    darkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-dark-900/3 border-dark-900/5 text-dark-900'
                  }`}>
                    {user.name}
                  </div>
                )}
              </div>

              {/* Email & Password Section */}
              <div className="p-8 rounded-3xl border bg-linear-to-br from-accent-400/3 to-cyan-400/3 border-accent-400/10 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-widest mb-1 ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>Email Address</label>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-dark-900'}`}>{user.email}</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>Primary identification used for sign-in.</p>
                  </div>
                  <button 
                    onClick={() => setConfirmPassword(confirmPassword === 'pass_toggle' ? '' : 'pass_toggle')}
                    className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${
                      confirmPassword === 'pass_toggle'
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-linear-to-r from-accent-400 to-cyan-400 text-white hover:opacity-90'
                    }`}
                  >
                    {confirmPassword === 'pass_toggle' ? 'Close' : 'Change Password'}
                  </button>
                </div>

                <AnimatePresence>
                  {confirmPassword === 'pass_toggle' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-6 mt-6 border-t border-accent-400/20"
                    >
                      <form onSubmit={handlePasswordChange} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>New Password</label>
                            <input
                              type="password"
                              required
                              className={`w-full px-4 py-3 rounded-xl outline-hidden border transition-all ${
                                darkMode 
                                  ? 'bg-dark-900/50 border-white/10 text-white focus:border-accent-400/50' 
                                  : 'bg-white border-dark-900/10 text-dark-900 focus:border-accent-400/50 shadow-sm'
                              }`}
                              placeholder="••••••••"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-light-500' : 'text-dark-400'}`}>Verify Password</label>
                            <input
                              type="password"
                              required
                              className={`w-full px-4 py-3 rounded-xl outline-hidden border transition-all ${
                                darkMode 
                                  ? 'bg-dark-900/50 border-white/10 text-white focus:border-accent-400/50' 
                                  : 'bg-white border-dark-900/10 text-dark-900 focus:border-accent-400/50 shadow-sm'
                              }`}
                              placeholder="••••••••"
                              onChange={(e) => {
                                // Simplified verification logic for this combined view
                                if (e.target.value !== newPassword && e.target.value.length >= newPassword.length) {
                                  setStatus({ type: 'error', message: 'Passwords do not match.' });
                                } else {
                                  setStatus({ type: '', message: '' });
                                }
                              }}
                            />
                          </div>
                        </div>

                        {status.message && (
                          <div className={`text-sm font-bold ${status.type === 'error' ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {status.message}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isUpdating}
                          className="w-full py-4 rounded-xl bg-linear-to-r from-accent-400 to-cyan-400 text-white font-bold shadow-lg hover:shadow-accent-400/20 transition-all active:scale-[0.98]"
                        >
                          {isUpdating ? 'Updating...' : 'Update Password Securely'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`p-5 rounded-2xl border text-center ${darkMode ? 'bg-white/2 border-white/5 text-light-500' : 'bg-dark-900/2 border-dark-900/5 text-dark-400'}`}>
                <p className="text-xs leading-relaxed flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Looking for support? Reach out to <strong>support@emipro.com</strong>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
