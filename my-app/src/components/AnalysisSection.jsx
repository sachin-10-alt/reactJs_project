import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const COLORS = {
  principal: '#6c63ff',
  interest: '#fb7185',
  balance: '#22d3ee',
  total: '#34d399',
};

function CustomTooltip({ active, payload, label, darkMode }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-4 py-3 rounded-xl shadow-2xl border ${
      darkMode
        ? 'bg-dark-800/95 border-white/10 text-white'
        : 'bg-white/95 border-dark-900/10 text-dark-900'
    }`} style={{ backdropFilter: 'blur(12px)' }}>
      <p className="text-xs font-semibold mb-2 opacity-60">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
          <span className="opacity-70">{entry.name}:</span>
          <span className="font-semibold">₹{Number(entry.value).toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalysisSection({ calc }) {
  const { darkMode } = useTheme();
  const [activeChart, setActiveChart] = useState('area');

  const chartTabs = [
    { key: 'area', label: 'Repayment Trend', icon: '📈' },
    { key: 'bar', label: 'Yearly Breakdown', icon: '📊' },
    { key: 'pie', label: 'Payment Split', icon: '🍩' },
  ];

  const pieData = [
    { name: 'Principal', value: Math.round(calc.loanAmount), color: COLORS.principal },
    { name: 'Interest', value: Math.round(calc.totalInterest), color: COLORS.interest },
  ];

  const axisStyle = {
    fontSize: 11,
    fill: darkMode ? 'rgba(196,203,245,0.5)' : 'rgba(54,54,112,0.5)',
  };

  return (
    <section id="analysis" className={`relative py-24 ${darkMode ? 'bg-dark-950' : 'bg-light-50'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
            darkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
          }`}>
            Visual Analysis
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-dark-900'
          }`}>
            Repayment <span className="gradient-text">Visualization</span>
          </h2>
        </motion.div>

        {/* Chart tabs */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {chartTabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeChart === tab.key
                  ? darkMode
                    ? 'text-white'
                    : 'text-dark-900'
                  : darkMode
                    ? 'text-light-400/50 hover:text-light-300'
                    : 'text-dark-500/50 hover:text-dark-700'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {activeChart === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-xl ${
                    darkMode
                      ? 'bg-accent-400/15 border border-accent-400/25'
                      : 'bg-accent-400/10 border border-accent-400/20'
                  }`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Chart container */}
        <motion.div
          className={`p-6 sm:p-8 rounded-3xl ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="h-[400px] w-full">
            {activeChart === 'area' && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={calc.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.principal} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={COLORS.principal} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.interest} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={COLORS.interest} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.balance} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={COLORS.balance} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? 'rgba(108,99,255,0.08)' : 'rgba(108,99,255,0.06)'}
                  />
                  <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, opacity: 0.7 }}
                  />
                  <Area type="monotone" dataKey="principal" name="Principal" stroke={COLORS.principal} fill="url(#gradPrincipal)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="interest" name="Interest" stroke={COLORS.interest} fill="url(#gradInterest)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="balance" name="Balance" stroke={COLORS.balance} fill="url(#gradBalance)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'bar' && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={calc.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? 'rgba(108,99,255,0.08)' : 'rgba(108,99,255,0.06)'}
                  />
                  <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                  <Legend wrapperStyle={{ fontSize: 12, opacity: 0.7 }} />
                  <Bar dataKey="principal" name="Principal" fill={COLORS.principal} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interest" name="Interest" fill={COLORS.interest} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'pie' && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, opacity: 0.7 }}
                    formatter={(value) => <span style={{ color: darkMode ? '#c4cbf5' : '#363670' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Chart description */}
          <div className={`mt-6 pt-6 border-t ${
            darkMode ? 'border-white/5' : 'border-dark-900/5'
          }`}>
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { color: COLORS.principal, label: 'Principal Component', desc: 'Increases over time' },
                { color: COLORS.interest, label: 'Interest Component', desc: 'Decreases over time' },
                { color: COLORS.balance, label: 'Outstanding Balance', desc: 'Reduces to zero' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <div>
                    <span className={`text-xs font-medium ${darkMode ? 'text-light-300' : 'text-dark-700'}`}>
                      {item.label}
                    </span>
                    <span className={`text-xs ml-1 ${darkMode ? 'text-light-400/40' : 'text-dark-500/40'}`}>
                      — {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
