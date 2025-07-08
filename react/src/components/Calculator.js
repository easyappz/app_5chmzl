import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CalculatorContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#000',
  color: '#fff',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
});

const Display = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  fontSize: '4rem',
  padding: '20px',
  backgroundColor: '#000',
  color: '#fff',
  borderBottom: '1px solid #333',
});

const ButtonsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '10px',
  padding: '10px',
  backgroundColor: '#000',
});

const CalcButton = styled(Button)(({ theme, variant }) => ({
  height: '80px',
  fontSize: '1.5rem',
  borderRadius: '50%',
  backgroundColor: variant === 'operation' ? '#ff9500' : variant === 'secondary' ? '#a5a5a5' : '#333',
  color: variant === 'secondary' ? '#000' : '#fff',
  '&:hover': {
    backgroundColor: variant === 'operation' ? '#ffaa33' : variant === 'secondary' ? '#b5b5b5' : '#444',
  },
  minWidth: '80px',
}));

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    if (waitingForSecondValue) {
      setWaitingForSecondValue(false);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleCalculate = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '×') {
      result = previousValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  return (
    <CalculatorContainer>
      <Display>
        <Typography variant="h1" style={{ fontWeight: 'lighter' }}>
          {display}
        </Typography>
      </Display>
      <ButtonsContainer>
        <CalcButton variant="secondary" onClick={handleClear}>
          AC
        </CalcButton>
        <CalcButton variant="secondary">+/-</CalcButton>
        <CalcButton variant="secondary">%</CalcButton>
        <CalcButton variant="operation" onClick={() => handleOperationClick('÷')}>
          ÷
        </CalcButton>
        <CalcButton onClick={() => handleNumberClick('7')}>7</CalcButton>
        <CalcButton onClick={() => handleNumberClick('8')}>8</CalcButton>
        <CalcButton onClick={() => handleNumberClick('9')}>9</CalcButton>
        <CalcButton variant="operation" onClick={() => handleOperationClick('×')}>
          ×
        </CalcButton>
        <CalcButton onClick={() => handleNumberClick('4')}>4</CalcButton>
        <CalcButton onClick={() => handleNumberClick('5')}>5</CalcButton>
        <CalcButton onClick={() => handleNumberClick('6')}>6</CalcButton>
        <CalcButton variant="operation" onClick={() => handleOperationClick('-')}>
          -
        </CalcButton>
        <CalcButton onClick={() => handleNumberClick('1')}>1</CalcButton>
        <CalcButton onClick={() => handleNumberClick('2')}>2</CalcButton>
        <CalcButton onClick={() => handleNumberClick('3')}>3</CalcButton>
        <CalcButton variant="operation" onClick={() => handleOperationClick('+')}>
          +
        </CalcButton>
        <CalcButton onClick={() => handleNumberClick('0')} style={{ gridColumn: 'span 2', borderRadius: '40px' }}>
          0
        </CalcButton>
        <CalcButton onClick={() => handleNumberClick('.')}>,</CalcButton>
        <CalcButton variant="operation" onClick={handleCalculate}>
          =
        </CalcButton>
      </ButtonsContainer>
    </CalculatorContainer>
  );
};

export default Calculator;
