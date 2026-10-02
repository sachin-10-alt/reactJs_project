import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function HeroSection() {
  const { darkMode } = useTheme();

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode ? 'bg-dark-950' : 'bg-light-50'
    }`}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)' }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${darkMode ? 'rgba(108,99,255,0.3)' : 'rgba(108,99,255,0.15)'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? 'rgba(108,99,255,0.3)' : 'rgba(108,99,255,0.15)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase mb-8 ${
              darkMode
                ? 'bg-accent-400/10 text-accent-400 border border-accent-400/20'
                : 'bg-accent-400/10 text-accent-500 border border-accent-400/20'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Smart Financial Planning
          </motion.div>

          {/* Main heading */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6 ${
            darkMode ? 'text-white' : 'text-dark-900'
          }`}>
            Calculate Your
            <br />
            <span className="gradient-text">EMI Instantly</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
              darkMode ? 'text-light-300/70' : 'text-dark-600/70'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Visualize your loan repayment journey with precision. Interactive sliders,
            real-time charts, and detailed amortization schedules — all in one beautiful tool.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a
              href="#calculator"
              className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-accent-400 via-accent-500 to-cyan-500 animate-gradient" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-cyan-500 via-accent-400 to-accent-500 animate-gradient" />
              <span className="relative flex items-center gap-2">
                Start Calculating
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>

            <motion.a
              href="#analysis"
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                darkMode
                  ? 'text-light-300 border border-white/10 hover:border-accent-400/40 hover:bg-white/5'
                  : 'text-dark-700 border border-dark-900/10 hover:border-accent-400/40 hover:bg-dark-900/5'
              }`}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View Analysis
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {[
            { value: '100%', label: 'Free Forever' },
            { value: '0.01s', label: 'Calculation Time' },
            { value: '∞', label: 'Scenarios' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`p-4 rounded-2xl ${
                darkMode ? 'glass-card-dark' : 'glass-card-light'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <div className="gradient-text text-2xl sm:text-3xl font-bold">{stat.value}</div>
              <div className={`text-xs mt-1 ${
                darkMode ? 'text-light-400/60' : 'text-dark-500/60'
              }`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
          darkMode ? 'border-white/20' : 'border-dark-900/20'
        }`}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
