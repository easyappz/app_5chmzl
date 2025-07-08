const express = require('express');
const mongoose = require('mongoose');

// Router instance
const router = express.Router();

// Define a schema for calculation history
const CalculationSchema = new mongoose.Schema({
  expression: { type: String, required: true },
  result: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Define a model for calculations using mongoose directly
const Calculation = mongoose.model('Calculation', CalculationSchema);

// GET /api/hello - Test endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Calculator API!' });
});

// GET /api/status - Server status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate - Perform calculation and save to history
router.post('/calculate', async (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression) {
      return res.status(400).json({ error: 'Expression is required' });
    }

    // Evaluate the expression (safely)
    let result;
    try {
      // Very basic evaluation for now, only simple arithmetic
      // In production, use a proper math library like 'mathjs' for safety
      result = eval(expression);
      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid result');
      }
    } catch (error) {
      return res.status(400).json({ error: 'Invalid expression' });
    }

    // Save to database
    const calculation = new Calculation({
      expression,
      result
    });
    await calculation.save();

    // Return the result
    res.json({ result });
  } catch (error) {
    console.error('Error in calculation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/history - Get calculation history
router.get('/history', async (req, res) => {
  try {
    const history = await Calculation.find().sort({ timestamp: -1 }).limit(10);
    res.json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
