// Import des modules
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

// Création de l'application Express
const app = express();
const PORT = 3000;
app.use(express.urlencoded()) ;
app.use(express.json()) ;


// Utilisation des routes
app.use('/posts', postRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/bdd")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));
app.use(loginRoutes);
app.use(postRoutes);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
