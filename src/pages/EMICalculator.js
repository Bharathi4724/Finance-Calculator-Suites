import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Results from '../components/Results';
import History from '../components/History';
import { calculateEMI, formatNumber } from '../utils/calculations';

/**
 * EMI Calculator Page
 * Calculates monthly EMI, total interest, and total amount for loans
 */
const EMICalculator = () => {
  // Form state
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('months'); // 'months' or 'years'
  
  // Results and history state
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  /**
   * Validate form inputs
   */
  const validateInputs = () => {
    const newErrors = {};
    
    if (!principal || parseFloat(principal) <= 0) {
      newErrors.principal = 'Please enter a valid principal amount';
    }
    
    if (!interestRate || parseFloat(interestRate) < 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    }
    
    if (!tenure || parseInt(tenure) <= 0) {
      newErrors.tenure = 'Please enter a valid tenure';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    // Convert tenure to months if in years
    const tenureInMonths = tenureType === 'years' 
      ? parseInt(tenure) * 12 
      : parseInt(tenure);
    
    // Calculate EMI
    const result = calculateEMI(
      parseFloat(principal),
      parseFloat(interestRate),
      tenureInMonths
    );
    
    setResults(result);
    
    // Add to history
    const historyEntry = {
      label: `₹${formatNumber(parseFloat(principal), 0)} @ ${interestRate}% for ${tenure} ${tenureType}`,
      value: `EMI: ₹${formatNumber(result.emi)}`
    };
    setHistory([historyEntry, ...history.slice(0, 9)]); // Keep last 10 entries
  };

  /**
   * Reset form
   */
  const handleReset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setTenureType('months');
    setResults(null);
    setErrors({});
  };

  /**
   * Clear history
   */
  const handleClearHistory = () => {
    setHistory([]);
  };

  // Prepare results for display
  const resultItems = results ? [
    {
      label: 'Monthly EMI',
      value: `₹${formatNumber(results.emi)}`,
      className: 'success'
    },
    {
      label: 'Total Interest',
      value: `₹${formatNumber(results.totalInterest)}`,
      className: 'warning'
    },
    {
      label: 'Total Amount',
      value: `₹${formatNumber(results.totalAmount)}`
    }
  ] : [];

  return (
    <div className="calculator-container">
      <Card
        title="Loan / EMI Calculator"
        subtitle="Calculate your monthly EMI and total interest"
        icon={<Calculator size={24} />}
      >
        <form onSubmit={handleCalculate}>
          {/* Principal Amount */}
          <Input
            label="Principal Amount"
            type="number"
            value={principal}
            onChange={setPrincipal}
            placeholder="Enter loan amount"
            prefix="₹"
            error={errors.principal}
            min="0"
            step="1000"
            required
          />
          
          {/* Interest Rate */}
          <Input
            label="Annual Interest Rate"
            type="number"
            value={interestRate}
            onChange={setInterestRate}
            placeholder="Enter interest rate"
            suffix="%"
            error={errors.interestRate}
            min="0"
            max="100"
            step="0.1"
            required
          />
          
          {/* Tenure */}
          <div className="form-row">
            <Input
              label="Loan Tenure"
              type="number"
              value={tenure}
              onChange={setTenure}
              placeholder="Enter tenure"
              error={errors.tenure}
              min="1"
              required
            />
            <div className="form-group">
              <label className="form-label">Tenure Type</label>
              <div className="radio-group" style={{ marginTop: '12px' }}>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="tenureType"
                    value="months"
                    checked={tenureType === 'months'}
                    onChange={(e) => setTenureType(e.target.value)}
                    className="radio-input"
                  />
                  Months
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="tenureType"
                    value="years"
                    checked={tenureType === 'years'}
                    onChange={(e) => setTenureType(e.target.value)}
                    className="radio-input"
                  />
                  Years
                </label>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="form-row" style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary btn-block">
              Calculate EMI
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-block"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        
        {/* Results */}
        {results && (
          <Results
            title="EMI Calculation Results"
            items={resultItems}
            icon={<Calculator size={18} />}
          />
        )}
      </Card>
      
      {/* History */}
      <History
        items={history}
        onClear={handleClearHistory}
        title="EMI Calculation History"
      />
    </div>
  );
};

export default EMICalculator;
