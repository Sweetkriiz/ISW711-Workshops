const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const courseRoutes = require('./routes/routes');

const app = express(); 

// Middlewares
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: '*'
}));

// Rutas
app.use('/api', courseRoutes);

app.use(express.static('client'));

// Conexión a MongoDB
mongoose.connect(process.env.DATABASE_URL);

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

// Start server
app.listen(3001, () =>
  console.log(`UTN API service listening on port 3001!`)
);
