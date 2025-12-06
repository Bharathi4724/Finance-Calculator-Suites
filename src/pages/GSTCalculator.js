import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Select from '../components/Select';
import Results from '../components/Results';
import History from '../components/History';
import { calculateGST, formatNumber } from '../utils/calculations';

/**
 * GST Calculator Page
 * Calculates GST component and final amount (add or extract GST)
 */
const GSTCalculator = () => {
  // Form state
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [mode, setMode] = useState('add'); // 'add' or 'subtract'
  
  // Results and history state
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  // GST rate options
  const gstRateOptions = [
    { value: '0', label: '0% (Exempt)' },
    { value: '5', label: '5% GST' },
    { value: '12', label: '12% GST' },
    { value: '18', label: '18% GST' },
    { value: '28', label: '28% GST' }
  ];

  /**
   * Validate form inputs
   */
  const validateInputs = () => {
    const newErrors = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
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
    
    // Calculate GST
    const result = calculateGST(
      parseFloat(amount),
      parseFloat(gstRate),
      mode
    );
    
    setResults(result);
    
    // Add to history
    const modeLabel = mode === 'add' ? 'Add GST' : 'Extract GST';
    const historyEntry = {
      label: `₹${formatNumber(parseFloat(amount), 0)} @ ${gstRate}% (${modeLabel})`,
      value: `GST: ₹${formatNumber(result.gstAmount)}`
    };
    setHistory([historyEntry, ...history.slice(0, 9)]);
  };

  /**
   * Reset form
   */
  const handleReset = () => {
    setAmount('');
    setGstRate('18');
    setMode('add');
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
      label: mode === 'add' ? 'Base Amount' : 'Base Amount (Excl. GST)',
      value: `₹${formatNumber(results.baseAmount)}`
    },
    {
      label: 'GST Amount',
      value: `₹${formatNumber(results.gstAmount)}`,
      className: 'warning'
    },
    {
      label: mode === 'add' ? 'Final Amount (Incl. GST)' : 'Total Amount',
      value: `₹${formatNumber(results.finalAmount)}`,
      className: 'success'
    }
  ] : [];

  return (
    <div className="calculator-container">
      <Card
        title="GST / Tax Calculator"
        subtitle="Calculate GST component and final amount"
        icon={<Receipt size={24} />}
      >
        <form onSubmit={handleCalculate}>
          {/* Amount */}
          <Input
            label={mode === 'add' ? 'Amount (Excluding GST)' : 'Amount (Including GST)'}
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Enter amount"
            prefix="₹"
            error={errors.amount}
            min="0"
            step="0.01"
            required
          />
          
          {/* GST Rate */}
          <Select
            label="GST Rate"
            value={gstRate}
            onChange={setGstRate}
            options={gstRateOptions}
            required
          />
          
          {/* Mode Selection */}
          <div className="form-group">
            <label className="form-label">Calculation Mode</label>
            <div className="radio-group" style={{ marginTop: '8px' }}>
              <label className="radio-label">
                <input
                  type="radio"
                  name="mode"
                  value="add"
                  checked={mode === 'add'}
                  onChange={(e) => setMode(e.target.value)}
                  className="radio-input"
                />
                Add GST to Amount
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="mode"
                  value="subtract"
                  checked={mode === 'subtract'}
                  onChange={(e) => setMode(e.target.value)}
                  className="radio-input"
                />
                Extract GST from Amount
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="form-row" style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary btn-block">
              Calculate GST
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
            title="GST Calculation Results"
            items={resultItems}
            icon={<Receipt size={18} />}
          />
        )}
      </Card>
      
      {/* History */}
      <History
        items={history}
        onClear={handleClearHistory}
        title="GST Calculation History"
      />
    </div>
  );
};

export default GSTCalculator;
