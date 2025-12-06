import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Receipt, 
  ArrowRightLeft, 
  Activity, 
  Sun, 
  Moon,
  Wallet
} from 'lucide-react';

// Import calculator pages
import EMICalculator from './pages/EMICalculator';
import GSTCalculator from './pages/GSTCalculator';
import CurrencyConverter from './pages/CurrencyConverter';
import BMICalculator from './pages/BMICalculator';

/**
 * Finance Calculator Suite - Main Application
 * A single-page application with multiple financial calculators
 * No database - all calculations happen client-side
 */
const App = () => {
  // Current active calculator
  const [activeCalculator, setActiveCalculator] = useState('emi');
  
  // Theme state (light/dark)
  const [theme, setTheme] = useState('light');

  // Navigation items configuration
  const navItems = [
    { 
      id: 'emi', 
      label: 'Loan / EMI Calculator', 
      icon: Calculator,
      description: 'Calculate monthly EMI and total interest'
    },
    { 
      id: 'gst', 
      label: 'GST / Tax Calculator', 
      icon: Receipt,
      description: 'Calculate GST component and final amount'
    },
    { 
      id: 'currency', 
      label: 'Currency Converter', 
      icon: ArrowRightLeft,
      description: 'Convert between currencies'
    },
    { 
      id: 'bmi', 
      label: 'BMI Calculator', 
      icon: Activity,
      description: 'Calculate Body Mass Index'
    }
  ];

  /**
   * Apply theme to document
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Save theme preference to localStorage
    localStorage.setItem('finance-calc-theme', theme);
  }, [theme]);

  /**
   * Load saved theme on mount
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('finance-calc-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Render the active calculator component
   */
  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'emi':
        return <EMICalculator />;
      case 'gst':
        return <GSTCalculator />;
      case 'currency':
        return <CurrencyConverter />;
      case 'bmi':
        return <BMICalculator />;
      default:
        return <EMICalculator />;
    }
  };

  /**
   * Get current calculator info for page header
   */
  const getCurrentCalculatorInfo = () => {
    return navItems.find(item => item.id === activeCalculator) || navItems[0];
  };

  const currentCalc = getCurrentCalculatorInfo();

  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        {/* Logo & Title */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Wallet size={24} />
          </div>
          <div>
            <h1 className="sidebar-title">Finance Suite</h1>
            <p className="sidebar-subtitle">Calculator Tools</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav-list">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-button ${activeCalculator === item.id ? 'active' : ''}`}
                    onClick={() => setActiveCalculator(item.id)}
                  >
                    <IconComponent size={20} className="nav-icon" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="theme-toggle">
          <button className="theme-button" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <Moon size={18} />
                Dark Mode
              </>
            ) : (
              <>
                <Sun size={18} />
                Light Mode
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">{currentCalc.label}</h1>
          <p className="page-description">{currentCalc.description}</p>
        </header>

        {/* Calculator Content */}
        {renderCalculator()}
      </main>
    </div>
  );
};

export default App;
