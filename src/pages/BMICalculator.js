import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Results from '../components/Results';
import History from '../components/History';
import { calculateBMI, formatNumber } from '../utils/calculations';

/**
 * BMI Calculator Page
 * Calculates Body Mass Index and provides health category
 */
const BMICalculator = () => {
  // Form state
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  
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
    
    if (!weight || parseFloat(weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight';
    }
    
    if (!height || parseFloat(height) <= 0) {
      newErrors.height = 'Please enter a valid height';
    }
    
    // Additional validation for reasonable values
    if (unit === 'metric') {
      if (parseFloat(weight) > 500) {
        newErrors.weight = 'Weight seems too high. Please check your input.';
      }
      if (parseFloat(height) > 300) {
        newErrors.height = 'Height seems too high. Please check your input.';
      }
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
    
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);
    
    // Convert imperial to metric if needed
    if (unit === 'imperial') {
      // Convert pounds to kg (1 lb = 0.453592 kg)
      weightKg = parseFloat(weight) * 0.453592;
      // Convert inches to cm (1 inch = 2.54 cm)
      heightCm = parseFloat(height) * 2.54;
    }
    
    // Calculate BMI
    const result = calculateBMI(weightKg, heightCm);
    
    setResults(result);
    
    // Add to history
    const historyEntry = {
      label: `${weight} ${unit === 'metric' ? 'kg' : 'lb'}, ${height} ${unit === 'metric' ? 'cm' : 'in'}`,
      value: `BMI: ${formatNumber(result.bmi, 1)} (${result.category})`
    };
    setHistory([historyEntry, ...history.slice(0, 9)]);
  };

  /**
   * Reset form
   */
  const handleReset = () => {
    setWeight('');
    setHeight('');
    setResults(null);
    setErrors({});
  };

  /**
   * Clear history
   */
  const handleClearHistory = () => {
    setHistory([]);
  };

  /**
   * Get color class based on BMI category
   */
  const getBMIColorClass = (category) => {
    switch (category) {
      case 'Underweight': return 'warning';
      case 'Normal': return 'success';
      case 'Overweight': return 'warning';
      case 'Obese': return 'error';
      default: return '';
    }
  };

  // Prepare results for display
  const resultItems = results ? [
    {
      label: 'Your BMI',
      value: formatNumber(results.bmi, 1),
      className: getBMIColorClass(results.category)
    },
    {
      label: 'Category',
      value: results.category,
      badge: results.category,
      badgeClass: results.categoryClass
    }
  ] : [];

  return (
    <div className="calculator-container">
      <Card
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index"
        icon={<Activity size={24} />}
      >
        <form onSubmit={handleCalculate}>
          {/* Unit Selection */}
          <div className="form-group">
            <label className="form-label">Measurement Unit</label>
            <div className="radio-group" style={{ marginTop: '8px' }}>
              <label className="radio-label">
                <input
                  type="radio"
                  name="unit"
                  value="metric"
                  checked={unit === 'metric'}
                  onChange={(e) => {
                    setUnit(e.target.value);
                    setWeight('');
                    setHeight('');
                    setResults(null);
                  }}
                  className="radio-input"
                />
                Metric (kg, cm)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="unit"
                  value="imperial"
                  checked={unit === 'imperial'}
                  onChange={(e) => {
                    setUnit(e.target.value);
                    setWeight('');
                    setHeight('');
                    setResults(null);
                  }}
                  className="radio-input"
                />
                Imperial (lb, in)
              </label>
            </div>
          </div>
          
          {/* Weight and Height */}
          <div className="form-row">
            <Input
              label={`Weight (${unit === 'metric' ? 'kg' : 'lb'})`}
              type="number"
              value={weight}
              onChange={setWeight}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
              suffix={unit === 'metric' ? 'kg' : 'lb'}
              error={errors.weight}
              min="0"
              step="0.1"
              required
            />
            <Input
              label={`Height (${unit === 'metric' ? 'cm' : 'in'})`}
              type="number"
              value={height}
              onChange={setHeight}
              placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
              suffix={unit === 'metric' ? 'cm' : 'in'}
              error={errors.height}
              min="0"
              step="0.1"
              required
            />
          </div>
          
          {/* Action Buttons */}
          <div className="form-row" style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary btn-block">
              Calculate BMI
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
            title="BMI Results"
            items={resultItems}
            icon={<Activity size={18} />}
          />
        )}
        
        {/* BMI Categories Reference */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: 'var(--bg-tertiary)', 
          borderRadius: 'var(--radius-md)'
        }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: 'var(--text-primary)'
          }}>
            BMI Categories (WHO Standards)
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '8px',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="bmi-badge underweight">Underweight</span>
              <span style={{ color: 'var(--text-secondary)' }}>&lt; 18.5</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="bmi-badge normal">Normal</span>
              <span style={{ color: 'var(--text-secondary)' }}>18.5 - 24.9</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="bmi-badge overweight">Overweight</span>
              <span style={{ color: 'var(--text-secondary)' }}>25 - 29.9</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="bmi-badge obese">Obese</span>
              <span style={{ color: 'var(--text-secondary)' }}>&ge; 30</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* History */}
      <History
        items={history}
        onClear={handleClearHistory}
        title="BMI Calculation History"
      />
    </div>
  );
};

export default BMICalculator;
