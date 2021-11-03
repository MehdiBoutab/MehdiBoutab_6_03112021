//import des différents packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//import des packages de sécurité
const cors = require("cors");
const helmet = require("helmet");

//import des routes sauces et user
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
// Connexion à la base de données
mongoose
  .connect(process.env.MANGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !" + err));

//Cors pour éviter les erreurs de CORS
app.use(cors());

// Ajoute extra headers pour protéger les routes
app.use(helmet());

//Transforme les données arrivant des requêtes POST en objet JSON
app.use(express.json());

// middleware qui permet l'accès statique à des images _dirname= nom du dossier ou ns ns trouvons
app.use("/images", express.static(path.join(__dirname, "images")));

// Utilisation des routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
