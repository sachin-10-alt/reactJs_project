import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const formatCurrency = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString('en-IN')}`;
};

function Slider({ label, value, onChange, min, max, step, format, unit, icon }) {
  const { darkMode } = useTheme();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <motion.div
      className={`p-6 rounded-2xl ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-accent-400/20 to-cyan-400/20 flex items-center justify-center">
            {icon}
          </div>
          <span className={`text-sm font-medium ${darkMode ? 'text-light-300' : 'text-dark-600'}`}>
            {label}
          </span>
        </div>
        <motion.div
          className={`px-4 py-2 rounded-xl text-lg font-bold ${
            darkMode
              ? 'bg-accent-400/10 text-accent-400 border border-accent-400/20'
              : 'bg-accent-400/10 text-accent-500 border border-accent-400/15'
          }`}
          key={value}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {format ? format(value) : value}{unit && <span className="text-xs ml-1 opacity-60">{unit}</span>}
        </motion.div>
      </div>

      {/* Custom slider */}
      <div className="relative mt-2">
        <div className={`h-2 rounded-full overflow-hidden ${
          darkMode ? 'bg-dark-700' : 'bg-light-200'
        }`}>
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-accent-400 to-cyan-400"
            style={{ width: `${percentage}%` }}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-thumb absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          style={{ top: '0px' }}
        />
        {/* Visual thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-linear-to-br from-accent-400 to-cyan-400 border-[3px] border-white shadow-lg pointer-events-none"
          style={{ left: `calc(${percentage}% - 10px)` }}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.2 }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-2">
        <span className={`text-xs ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>
          {format ? format(min) : min}{unit || ''}
        </span>
        <span className={`text-xs ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>
          {format ? format(max) : max}{unit || ''}
        </span>
      </div>
    </motion.div>
  );
}

export default function CalculatorSection({ calc }) {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="calculator" className={`relative py-24 ${darkMode ? 'bg-dark-900' : 'bg-white'}`}>
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)' }}
        />
      </div>

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
            darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
          }`}>
            Interactive Calculator
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-dark-900'
          }`}>
            Customize Your <span className="gradient-text">Loan Parameters</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Sliders Column */}
          <motion.div className="space-y-5" variants={itemVariants}>
            <Slider
              label="Loan Amount"
              value={calc.loanAmount}
              onChange={calc.setLoanAmount}
              min={100000}
              max={50000000}
              step={50000}
              format={formatCurrency}
              icon={
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <Slider
              label="Interest Rate"
              value={calc.interestRate}
              onChange={calc.setInterestRate}
              min={1}
              max={25}
              step={0.1}
              unit="% p.a."
              icon={
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              }
            />
            <Slider
              label="Loan Tenure"
              value={calc.tenure}
              onChange={calc.setTenure}
              min={1}
              max={30}
              step={1}
              unit=" years"
              icon={
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </motion.div>

          {/* Results Column */}
          <motion.div className="space-y-5" variants={itemVariants}>
            {/* EMI Result Card */}
            <motion.div
              className={`p-8 rounded-3xl relative overflow-hidden ${
                darkMode ? 'glass-card-dark' : 'glass-card-light'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent-400/5 via-transparent to-cyan-400/5" />
              <div className="relative">
                <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-light-400/60' : 'text-dark-500/60'}`}>
                  Monthly EMI
                </p>
                <motion.div
                  className="gradient-text text-5xl sm:text-6xl font-extrabold tracking-tight"
                  key={Math.round(calc.emi)}
                  initial={{ scale: 0.95, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  ₹{Math.round(calc.emi).toLocaleString('en-IN')}
                </motion.div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>
                  per month for {calc.tenure} years ({calc.tenure * 12} months)
                </p>
              </div>
            </motion.div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: 'Total Interest',
                  value: calc.totalInterest,
                  color: 'from-rose-400/20 to-rose-500/5',
                  textColor: 'text-rose-400',
                  borderColor: 'border-rose-400/20',
                },
                {
                  label: 'Total Payment',
                  value: calc.totalPayment,
                  color: 'from-emerald-400/20 to-emerald-500/5',
                  textColor: 'text-emerald-400',
                  borderColor: 'border-emerald-400/20',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`p-5 rounded-2xl relative overflow-hidden ${
                    darkMode ? 'glass-card-dark' : 'glass-card-light'
                  }`}
                  whileHover={{ scale: 1.03, y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${item.color}`} />
                  <div className="relative">
                    <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-light-400/50' : 'text-dark-500/50'}`}>
                      {item.label}
                    </p>
                    <motion.p
                      className={`text-xl font-bold ${item.textColor}`}
                      key={Math.round(item.value)}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      ₹{Math.round(item.value).toLocaleString('en-IN')}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ratio Bar */}
            <motion.div
              className={`p-5 rounded-2xl ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium ${darkMode ? 'text-light-300/60' : 'text-dark-600/60'}`}>
                  Principal vs Interest Ratio
                </span>
                <span className={`text-xs ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>
                  {((calc.loanAmount / calc.totalPayment) * 100).toFixed(1)}% : {((calc.totalInterest / calc.totalPayment) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden flex bg-dark-700/20">
                <motion.div
                  className="h-full bg-linear-to-r from-accent-400 to-accent-500 rounded-l-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(calc.loanAmount / calc.totalPayment) * 100}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="h-full bg-linear-to-r from-rose-400 to-rose-500 rounded-r-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(calc.totalInterest / calc.totalPayment) * 100}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-400" />
                  <span className={`text-xs ${darkMode ? 'text-light-400/50' : 'text-dark-500/50'}`}>Principal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className={`text-xs ${darkMode ? 'text-light-400/50' : 'text-dark-500/50'}`}>Interest</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
