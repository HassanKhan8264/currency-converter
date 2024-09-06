const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const API_KEY = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
const EXCHANGE_RATE_URL = 'https://api.freecurrencyapi.com/v1/latest';
const API_URL = 'https://api.freecurrencyapi.com/v1/currencies';

app.use(cors());

// Endpoint to fetch currency data
app.get('/currencies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
    res.json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching currency data', error: error.message });
  }
});

// Endpoint to convert currency
app.get('/convert', async (req, res) => {
  const { from, to, amount } = req.query;
  try {
    // Fetch exchange rate data from the API
    const response = await axios.get(`${EXCHANGE_RATE_URL}?apikey=${API_KEY}&base_currency=${from}`);
    const rates = response.data.data;

    // Perform conversion
    if (rates[to]) {
      const conversionRate = rates[to];
      const convertedAmount = (amount * conversionRate).toFixed(2); // Convert and format to two decimal places

      res.json({
        from,
        to,
        amount,
        convertedAmount,
        rate: conversionRate
      });
    } else {
      res.status(404).json({ message: 'Currency not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching currency data', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
