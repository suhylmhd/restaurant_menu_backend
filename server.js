const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

import path from "path";
import express from "express";
const __dirname = path.resolve();

// Serve frontend (optional if hosted separately)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const menuRoutes = require('./routes/menuRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Routes
app.use('/api/menus', menuRoutes);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Atlas connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
