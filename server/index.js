const express = require('express');
const axios = require('axios');
const app = express();
const API_BASE_URL = 'https://api.freecurrencyapi.com/v1/currencies';
const API_KEY = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
const cors = require('cors');

app.use(cors())
// Endpoint to fetch currency data
app.get('/currencies', async (req, res) => {
    const { currencies } = req.query;
    try {
        // Fetch all currency data
        const response = await axios.get(`${API_BASE_URL}?apikey=${API_KEY}`);
        const allCurrencies = response.data.data;

        // If specific currencies are requested, filter them
        if (currencies) {
            const codes = currencies.split(',').map(code => code.trim().toUpperCase());
            const filteredCurrencies = {};
            codes.forEach(code => {
                if (allCurrencies[code]) {
                    filteredCurrencies[code] = allCurrencies[code];
                }
            });
            res.json({ data: filteredCurrencies });
        } else {
            res.json({ data: allCurrencies });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching currency data', error: error.message });
    }
});

// Endpoint to convert currency
app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;
    try {
        // Fetch exchange rate data from the API
        const response = await axios.get(`${API_BASE_URL}?apikey=${API_KEY}&base_currency=${from}`);
        const rates = response.data.data;

        // Perform conversion
        const conversionRate = rates[to] ? rates[to].rate : null;
        const convertedAmount = conversionRate ? amount * conversionRate : null;

        // Send the response with the required structure
        res.json({
            from,
            to,
            amount,
            convertedAmount,
            rate: rates[to] || null
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching currency data', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
