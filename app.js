const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
