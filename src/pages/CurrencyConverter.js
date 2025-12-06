import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Select from '../components/Select';
import Results from '../components/Results';
import History from '../components/History';
import { 
  convertCurrency, 
  formatNumber, 
  CURRENCY_RATES, 
  CURRENCY_NAMES, 
  CURRENCY_SYMBOLS 
} from '../utils/calculations';

/**
 * Currency Converter Page
 * Converts between currencies using static exchange rates (no API calls)
 */
const CurrencyConverter = () => {
  // Form state
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  
  // Results and history state
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  // Generate currency options from CURRENCY_RATES
  const currencyOptions = Object.keys(CURRENCY_RATES).map(code => ({
    value: code,
    label: `${code} - ${CURRENCY_NAMES[code]}`
  }));

  /**
   * Validate form inputs
   */
  const validateInputs = () => {
    const newErrors = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (fromCurrency === toCurrency) {
      newErrors.currency = 'Please select different currencies';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleConvert = (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    // Convert currency
    const result = convertCurrency(
      parseFloat(amount),
      fromCurrency,
      toCurrency
    );
    
    setResults(result);
    
    // Add to history
    const historyEntry = {
      label: `${CURRENCY_SYMBOLS[fromCurrency]}${formatNumber(parseFloat(amount))} ${fromCurrency}`,
      value: `${CURRENCY_SYMBOLS[toCurrency]}${formatNumber(result.convertedAmount)} ${toCurrency}`
    };
    setHistory([historyEntry, ...history.slice(0, 9)]);
  };

  /**
   * Swap currencies
   */
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResults(null);
  };

  /**
   * Reset form
   */
  const handleReset = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('INR');
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
      label: `Original (${results.fromCurrency})`,
      value: `${CURRENCY_SYMBOLS[results.fromCurrency]}${formatNumber(results.originalAmount)}`
    },
    {
      label: `Converted (${results.toCurrency})`,
      value: `${CURRENCY_SYMBOLS[results.toCurrency]}${formatNumber(results.convertedAmount)}`,
      className: 'success'
    },
    {
      label: 'Exchange Rate',
      value: `1 ${results.fromCurrency} = ${formatNumber(results.exchangeRate, 4)} ${results.toCurrency}`,
      className: 'warning'
    }
  ] : [];

  return (
    <div className="calculator-container">
      <Card
        title="Currency Converter"
        subtitle="Convert between currencies using static rates"
        icon={<ArrowRightLeft size={24} />}
      >
        <form onSubmit={handleConvert}>
          {/* Amount */}
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Enter amount to convert"
            prefix={CURRENCY_SYMBOLS[fromCurrency]}
            error={errors.amount}
            min="0"
            step="0.01"
            required
          />
          
          {/* Currency Selection */}
          <div className="form-row">
            <Select
              label="From Currency"
              value={fromCurrency}
              onChange={setFromCurrency}
              options={currencyOptions}
              error={errors.currency}
              required
            />
            <Select
              label="To Currency"
              value={toCurrency}
              onChange={setToCurrency}
              options={currencyOptions}
              required
            />
          </div>
          
          {/* Swap Button */}
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <button
              type="button"
              onClick={handleSwap}
              className="btn btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              <ArrowRightLeft size={16} />
              Swap Currencies
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="form-row" style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary btn-block">
              Convert
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
            title="Conversion Results"
            items={resultItems}
            icon={<ArrowRightLeft size={18} />}
          />
        )}
        
        {/* Exchange Rates Info */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: 'var(--bg-tertiary)', 
          borderRadius: 'var(--radius-md)',
          fontSize: '12px',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> Exchange rates are static and for demonstration purposes only. 
          Rates are approximate and may not reflect current market values.
        </div>
      </Card>
      
      {/* History */}
      <History
        items={history}
        onClear={handleClearHistory}
        title="Conversion History"
      />
    </div>
  );
};

export default CurrencyConverter;
