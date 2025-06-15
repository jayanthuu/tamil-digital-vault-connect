// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // ✅ THIS LINE IS IMPORTANT

dotenv.config();

const app = express();
connectDB(); // ✅ CALL THE FUNCTION

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
