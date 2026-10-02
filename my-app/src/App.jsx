import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useEMICalculator } from './hooks/useEMICalculator';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CalculatorSection from './components/CalculatorSection';
import AnalysisSection from './components/AnalysisSection';
import ScheduleSection from './components/ScheduleSection';
import FAQSection from './components/FAQSection';
import SettingsSection from './components/SettingsSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function AppContent() {
  const { darkMode } = useTheme();
  const calc = useEMICalculator();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-dark-950 text-white' : 'bg-light-50 text-dark-900'
    }`}>
      <Navbar />
      <HeroSection />
      <CalculatorSection calc={calc} />
      <AnalysisSection calc={calc} />
      <ScheduleSection calc={calc} />
      <FAQSection />
      <SettingsSection />
      <Footer />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
