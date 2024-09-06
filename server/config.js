require('dotenv').config({ path: '.env.local' });

const config = {
    API_KEY: process.env.API_KEY,
    EXCHANGE_RATE_URL: process.env.EXCHANGE_RATE_URL,
    PORT: process.env.PORT || 3000,
  };
  
  module.exports = config;
  