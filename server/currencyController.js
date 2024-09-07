const express = require("express");
const axios = require("axios");
const config = require("./config");
const router = express.Router();

router.get("/currencies", async (req, res) => {
  try {
    const response = await axios.get(
      `${config.EXCHANGE_RATE_URL}?apikey=${config.API_KEY}`
    );
    res.json({ data: response.data.data });
  } catch (error) {
    console.error('Error fetching currencies:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Error fetching currency data", error: error.message });
  }
});

router.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  try {
    const response = await axios.get(
      `${config.EXCHANGE_RATE_URL}?apikey=${config.API_KEY}&base_currency=${from}`
    );
    const rates = response.data.data;

    if (rates[to]) {
      const conversionRate = rates[to];
      const convertedAmount = (amount * conversionRate).toFixed(2);

      res.json({
        from,
        to,
        amount,
        convertedAmount,
        rate: conversionRate,
      });
    } else {
      res.status(404).json({ message: "Currency not found" });
    }
  } catch (error) {
    console.error('Error converting currency:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Error fetching currency data", error: error.message });
  }
});

module.exports = router;
