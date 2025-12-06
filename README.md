# Finance Calculator Suite

A modern, responsive React-based Finance Calculator Suite with multiple calculation tools. This single-page application runs entirely on the client side with no database or external backend required.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Core Calculators

1. **Loan / EMI Calculator**
   - Calculate monthly EMI (Equated Monthly Installment)
   - View total interest and total amount payable
   - Support for tenure in months or years
   - Uses standard EMI formula: `EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]`

2. **GST / Tax Calculator**
   - Add GST to an amount (exclusive → inclusive)
   - Extract GST from an amount (inclusive → exclusive)
   - Support for all Indian GST slabs (0%, 5%, 12%, 18%, 28%)

3. **Currency Converter**
   - Convert between 10 major currencies
   - Static exchange rates (no API calls required)
   - Supported currencies: USD, EUR, GBP, INR, JPY, AUD, CAD, CHF, CNY, SGD
   - Swap currencies with one click

4. **BMI Calculator**
   - Calculate Body Mass Index
   - Support for metric (kg/cm) and imperial (lb/in) units
   - WHO standard categories: Underweight, Normal, Overweight, Obese

### Additional Features

- **Light/Dark Mode Toggle** - Theme preference saved to localStorage
- **Calculation History** - Track recent calculations (clears on page refresh)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Input Validation** - Helpful error messages for invalid inputs
- **Clean UI** - Modern, accessible interface with smooth animations

## Screenshots

### Light Mode
![Light Mode Screenshot](screenshots/light-mode.png)

### Dark Mode
![Dark Mode Screenshot](screenshots/dark-mode.png)

### Mobile View
![Mobile Screenshot](screenshots/mobile-view.png)

## Project Structure

```
src/
├── components/
│   ├── Card.js          # Reusable card container component
│   ├── History.js       # Calculation history display
│   ├── Input.js         # Reusable input component with validation
│   ├── Results.js       # Results display grid component
│   └── Select.js        # Reusable dropdown select component
├── pages/
│   ├── BMICalculator.js     # BMI calculator page
│   ├── CurrencyConverter.js # Currency converter page
│   ├── EMICalculator.js     # Loan/EMI calculator page
│   └── GSTCalculator.js     # GST/Tax calculator page
├── utils/
│   └── calculations.js  # All calculation logic and utility functions
├── App.js               # Main application with navigation
├── index.js             # React entry point
└── index.css            # Global styles with CSS variables
```

## How to Run

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-calculator-suite.git
   cd finance-calculator-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Technologies Used

- **React 18** - UI library with functional components and hooks
- **Lucide React** - Beautiful, consistent icons
- **CSS Variables** - For theming and consistent styling
- **localStorage** - For persisting theme preference

## Calculation Formulas

### EMI Formula
```
EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]

Where:
P = Principal loan amount
R = Monthly interest rate (Annual rate / 12 / 100)
N = Number of monthly installments
```

### GST Calculation
```
Add GST:
  GST Amount = Base Amount × (GST Rate / 100)
  Final Amount = Base Amount + GST Amount

Extract GST:
  Base Amount = Total Amount / (1 + GST Rate / 100)
  GST Amount = Total Amount - Base Amount
```

### BMI Formula
```
BMI = Weight (kg) / Height (m)²

Categories (WHO):
- Underweight: BMI < 18.5
- Normal: 18.5 ≤ BMI < 25
- Overweight: 25 ≤ BMI < 30
- Obese: BMI ≥ 30
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [Create React App](https://create-react-app.dev/) for the project setup
