import { useState, useEffect, useCallback } from 'react';

export function useEMICalculator(initialValues = {}) {
  const [loanAmount, setLoanAmount] = useState(initialValues.loanAmount || 2500000);
  const [interestRate, setInterestRate] = useState(initialValues.interestRate || 8.5);
  const [tenure, setTenure] = useState(initialValues.tenure || 20);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [schedule, setSchedule] = useState([]);

  const calculate = useCallback(() => {
    const P = loanAmount;
    const annualRate = interestRate;
    const r = annualRate / 12 / 100;
    const n = tenure * 12;

    if (r === 0) {
      const monthlyEmi = P / n;
      setEmi(monthlyEmi);
      setTotalPayment(P);
      setTotalInterest(0);

      const sched = [];
      let balance = P;
      for (let i = 1; i <= n; i++) {
        const principal = monthlyEmi;
        balance -= principal;
        sched.push({
          month: i,
          year: Math.ceil(i / 12),
          emi: monthlyEmi,
          principal,
          interest: 0,
          balance: Math.max(0, balance),
          totalPrincipalPaid: principal * i,
          totalInterestPaid: 0,
        });
      }
      setSchedule(sched);
      return;
    }

    const monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = monthlyEmi * n;
    const totalInt = totalPay - P;

    setEmi(monthlyEmi);
    setTotalPayment(totalPay);
    setTotalInterest(totalInt);

    const sched = [];
    let balance = P;
    let cumPrincipal = 0;
    let cumInterest = 0;

    for (let i = 1; i <= n; i++) {
      const interestPart = balance * r;
      const principalPart = monthlyEmi - interestPart;
      balance -= principalPart;
      cumPrincipal += principalPart;
      cumInterest += interestPart;

      sched.push({
        month: i,
        year: Math.ceil(i / 12),
        emi: monthlyEmi,
        principal: principalPart,
        interest: interestPart,
        balance: Math.max(0, balance),
        totalPrincipalPaid: cumPrincipal,
        totalInterestPaid: cumInterest,
      });
    }
    setSchedule(sched);
  }, [loanAmount, interestRate, tenure]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  // Yearly summary for charts
  const yearlyData = [];
  const years = tenure;
  for (let y = 1; y <= years; y++) {
    const yearEntries = schedule.filter(s => s.year === y);
    if (yearEntries.length > 0) {
      const yearPrincipal = yearEntries.reduce((sum, e) => sum + e.principal, 0);
      const yearInterest = yearEntries.reduce((sum, e) => sum + e.interest, 0);
      const lastEntry = yearEntries[yearEntries.length - 1];
      yearlyData.push({
        year: `Y${y}`,
        yearNum: y,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.round(lastEntry.balance),
        totalPaid: Math.round(lastEntry.totalPrincipalPaid + lastEntry.totalInterestPaid),
      });
    }
  }

  return {
    loanAmount, setLoanAmount,
    interestRate, setInterestRate,
    tenure, setTenure,
    emi,
    totalInterest,
    totalPayment,
    schedule,
    yearlyData,
  };
}
