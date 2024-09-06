const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");

const app = express();
var cors = require('cors')

app.use(cors())

// // Define allowed origins
// const allowedOrigins = [
//   "http://localhost:4200",
//   "https://currency-converter-eta-seven.vercel.app",
//   "https://currency-converter-qaze.vercel.app"
// ];

// // Use CORS middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   })
// );

// Use the currency router
app.use("/", currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
