import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const faqs = [
  {
    q: 'What is EMI?',
    a: 'EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan over its tenure. It consists of both principal repayment and interest charged by the lender.',
  },
  {
    q: 'How is EMI calculated?',
    a: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n – 1), where P is the principal loan amount, r is the monthly interest rate, and n is the total number of monthly installments.',
  },
  {
    q: 'Can I prepay my loan to reduce EMI?',
    a: 'Yes! Most banks allow prepayment which can either reduce your EMI amount or shorten your loan tenure. Some banks may charge a prepayment penalty, so check with your lender before prepaying.',
  },
  {
    q: 'Does EMI stay the same throughout the loan?',
    a: 'For fixed-rate loans, the EMI remains constant. However, for floating-rate loans, your EMI may change as interest rates fluctuate during the loan tenure.',
  },
  {
    q: 'What factors affect my EMI?',
    a: 'Three main factors affect EMI: the principal loan amount (higher amount = higher EMI), interest rate (higher rate = higher EMI), and loan tenure (longer tenure = lower EMI but more total interest).',
  },
  {
    q: 'Is this calculator accurate?',
    a: 'This calculator uses the standard reducing balance EMI formula used by banks and financial institutions. The actual EMI may vary slightly depending on your lender\'s specific terms and processing fees.',
  },
];

export default function FAQSection() {
  const { darkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={`relative py-24 ${darkMode ? 'bg-dark-950' : 'bg-light-50'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
            darkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-400/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
          }`}>
            FAQ
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-dark-900'
          }`}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <motion.button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full p-5 rounded-2xl flex items-center justify-between text-left transition-all duration-300 ${
                    darkMode
                      ? `glass-card-dark ${isOpen ? 'border-accent-400/30' : ''}`
                      : `glass-card-light ${isOpen ? 'border-accent-400/30' : ''}`
                  }`}
                  whileHover={{ scale: 1.005 }}
                >
                  <span className={`text-sm font-semibold pr-4 ${
                    darkMode ? 'text-white' : 'text-dark-900'
                  }`}>
                    {faq.q}
                  </span>
                  <motion.div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      darkMode ? 'bg-accent-400/10' : 'bg-accent-400/10'
                    }`}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className={`w-4 h-4 ${darkMode ? 'text-accent-400' : 'text-accent-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className={`px-5 py-4 text-sm leading-relaxed ${
                        darkMode ? 'text-light-300/70' : 'text-dark-600/70'
                      }`}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
