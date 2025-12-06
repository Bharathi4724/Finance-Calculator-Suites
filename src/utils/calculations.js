/**
 * Finance Calculator Utility Functions
 * Contains all calculation logic for the Finance Calculator Suite
 */

/**
 * EMI Calculator
 * Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
 * Where: P = Principal, R = Monthly Interest Rate, N = Number of Months
 * 
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (percentage)
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {object} - EMI details including monthly payment, total interest, and total amount
 */
export const calculateEMI = (principal, annualRate, tenureMonths) => {
  // Convert annual rate to monthly rate (percentage to decimal)
  const monthlyRate = annualRate / 12 / 100;
  
  // Handle edge case where interest rate is 0
  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi: emi,
      totalAmount: principal,
      totalInterest: 0
    };
  }
  
  // Calculate EMI using standard formula
  const emiNumerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
  const emiDenominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
  const emi = emiNumerator / emiDenominator;
  
  // Calculate total amount and interest
  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;
  
  return {
    emi: emi,
    totalAmount: totalAmount,
    totalInterest: totalInterest
  };
};

/**
 * GST Calculator
 * Calculates GST component and final amount
 * 
 * @param {number} amount - Base amount
 * @param {number} gstRate - GST percentage
 * @param {string} mode - 'add' to add GST, 'subtract' to extract GST from inclusive amount
 * @returns {object} - GST details including base amount, GST component, and final amount
 */
export const calculateGST = (amount, gstRate, mode) => {
  if (mode === 'add') {
    // Add GST to the amount
    const gstAmount = (amount * gstRate) / 100;
    const finalAmount = amount + gstAmount;
    return {
      baseAmount: amount,
      gstAmount: gstAmount,
      finalAmount: finalAmount
    };
  } else {
    // Extract GST from GST-inclusive amount
    // If amount includes GST, then: amount = base + (base * rate/100)
    // So: base = amount / (1 + rate/100)
    const baseAmount = amount / (1 + gstRate / 100);
    const gstAmount = amount - baseAmount;
    return {
      baseAmount: baseAmount,
      gstAmount: gstAmount,
      finalAmount: amount
    };
  }
};

/**
 * Static Currency Exchange Rates
 * Base currency: USD
 * Rates are approximate and for demonstration purposes
 */
export const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  JPY: 149.50,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  SGD: 1.34
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
  CNY: '¥',
  SGD: 'S$'
};

export const CURRENCY_NAMES = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  SGD: 'Singapore Dollar'
};

/**
 * Currency Converter
 * Converts amount from one currency to another using static rates
 * 
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {object} - Conversion details including converted amount and exchange rate
 */
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // Convert to USD first, then to target currency
  const amountInUSD = amount / CURRENCY_RATES[fromCurrency];
  const convertedAmount = amountInUSD * CURRENCY_RATES[toCurrency];
  
  // Calculate direct exchange rate
  const exchangeRate = CURRENCY_RATES[toCurrency] / CURRENCY_RATES[fromCurrency];
  
  return {
    originalAmount: amount,
    convertedAmount: convertedAmount,
    exchangeRate: exchangeRate,
    fromCurrency: fromCurrency,
    toCurrency: toCurrency
  };
};

/**
 * BMI Calculator
 * Formula: BMI = weight (kg) / height (m)²
 * 
 * @param {number} weight - Weight in kilograms
 * @param {number} height - Height in centimeters
 * @returns {object} - BMI value and category
 */
export const calculateBMI = (weight, height) => {
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  
  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // Determine category based on WHO standards
  let category;
  let categoryClass;
  
  if (bmi < 18.5) {
    category = 'Underweight';
    categoryClass = 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
    categoryClass = 'normal';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    categoryClass = 'overweight';
  } else {
    category = 'Obese';
    categoryClass = 'obese';
  }
  
  return {
    bmi: bmi,
    category: category,
    categoryClass: categoryClass
  };
};

/**
 * Format number as currency
 * 
 * @param {number} value - Number to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format number with commas
 * 
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number string
 */
export const formatNumber = (value, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};
