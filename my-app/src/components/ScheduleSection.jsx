import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ScheduleSection({ calc }) {
  const { darkMode } = useTheme();
  const [visibleYears, setVisibleYears] = useState(3);
  const [expandedYear, setExpandedYear] = useState(null);

  // Group schedule by year
  const yearlyGroups = {};
  calc.schedule.forEach((entry) => {
    if (!yearlyGroups[entry.year]) yearlyGroups[entry.year] = [];
    yearlyGroups[entry.year].push(entry);
  });

  const years = Object.keys(yearlyGroups).map(Number);
  const displayYears = years.slice(0, visibleYears);

  return (
    <section id="schedule" className={`relative py-24 ${darkMode ? 'bg-dark-900' : 'bg-white'}`}>
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
            darkMode ? 'bg-rose-500/10 text-rose-400 border border-rose-400/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
          }`}>
            Amortization Schedule
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-dark-900'
          }`}>
            Detailed <span className="gradient-text">Payment Schedule</span>
          </h2>
          <p className={`mt-4 text-base max-w-xl mx-auto ${
            darkMode ? 'text-light-300/60' : 'text-dark-600/60'
          }`}>
            Expand each year to see the monthly breakdown of your EMI payments
          </p>
        </motion.div>

        {/* Year cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {displayYears.map((year, i) => {
              const entries = yearlyGroups[year];
              const yearPrincipal = entries.reduce((s, e) => s + e.principal, 0);
              const yearInterest = entries.reduce((s, e) => s + e.interest, 0);
              const endBalance = entries[entries.length - 1].balance;
              const isExpanded = expandedYear === year;

              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  {/* Year header */}
                  <motion.button
                    onClick={() => setExpandedYear(isExpanded ? null : year)}
                    className={`w-full p-5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                      darkMode
                        ? `glass-card-dark ${isExpanded ? 'border-accent-400/30' : ''}`
                        : `glass-card-light ${isExpanded ? 'border-accent-400/30' : ''}`
                    }`}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.998 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        darkMode
                          ? 'bg-accent-400/10 text-accent-400'
                          : 'bg-accent-400/10 text-accent-500'
                      }`}>
                        {year}
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-dark-900'}`}>
                          Year {year}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-light-400/50' : 'text-dark-500/50'}`}>
                          {entries.length} months
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-accent-400 font-medium">₹{Math.round(yearPrincipal).toLocaleString('en-IN')}</p>
                        <p className={`text-xs ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>Principal</p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-rose-400 font-medium">₹{Math.round(yearInterest).toLocaleString('en-IN')}</p>
                        <p className={`text-xs ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>Interest</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-cyan-400 font-medium">₹{Math.round(endBalance).toLocaleString('en-IN')}</p>
                        <p className={`text-xs ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>Balance</p>
                      </div>
                      <motion.svg
                        className={`w-5 h-5 ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  </motion.button>

                  {/* Monthly details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={`mt-2 rounded-2xl overflow-hidden ${
                          darkMode ? 'bg-dark-800/50' : 'bg-light-100/50'
                        }`}>
                          {/* Table header */}
                          <div className={`grid grid-cols-5 px-5 py-3 text-xs font-semibold tracking-wide uppercase ${
                            darkMode ? 'bg-dark-700/30 text-light-400/50' : 'bg-light-200/50 text-dark-500/50'
                          }`}>
                            <span>Month</span>
                            <span className="text-right">EMI</span>
                            <span className="text-right">Principal</span>
                            <span className="text-right">Interest</span>
                            <span className="text-right">Balance</span>
                          </div>

                          {entries.map((entry, j) => (
                            <motion.div
                              key={entry.month}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.02, duration: 0.3 }}
                              className={`grid grid-cols-5 px-5 py-3 text-sm border-t ${
                                darkMode
                                  ? 'border-white/3 hover:bg-accent-400/5'
                                  : 'border-dark-900/3 hover:bg-accent-400/5'
                              } transition-colors`}
                            >
                              <span className={darkMode ? 'text-light-300' : 'text-dark-700'}>
                                {entry.month}
                              </span>
                              <span className={`text-right font-medium ${darkMode ? 'text-white' : 'text-dark-900'}`}>
                                ₹{Math.round(entry.emi).toLocaleString('en-IN')}
                              </span>
                              <span className="text-right text-accent-400">
                                ₹{Math.round(entry.principal).toLocaleString('en-IN')}
                              </span>
                              <span className="text-right text-rose-400">
                                ₹{Math.round(entry.interest).toLocaleString('en-IN')}
                              </span>
                              <span className="text-right text-cyan-400">
                                ₹{Math.round(entry.balance).toLocaleString('en-IN')}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load more button */}
        {visibleYears < years.length && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setVisibleYears((prev) => Math.min(prev + 5, years.length))}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                darkMode
                  ? 'bg-accent-400/10 text-accent-400 border border-accent-400/20 hover:bg-accent-400/20'
                  : 'bg-accent-400/10 text-accent-500 border border-accent-400/20 hover:bg-accent-400/15'
              }`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Show More Years ({years.length - visibleYears} remaining)
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
