import express from "express";
import authRoutes from "./routes/auth.route.js";
import rdvRoutes from "./routes/rdv.route.js";
import pool from "./config/db.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

// check required environment variables
["DB_HOST","DB_USER","DB_PASSWORD","DB_NAME","JWT_SECRET"].forEach((key) => {
  if (!process.env[key]) {
    console.error(`env var ${key} is required`);
    process.exit(1);
  }
});

const app = express();
const port = process.env.PORT || 3000;

// security helpers
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// basic rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/rdv", rdvRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route non trouvee",
    // creation objet data + transformation date en cjainde standar isi8601
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("connexion DB ok");

    app.listen(port, () => {
      console.log("server demarrer");
    });
  } catch (error) {
    console.log("impossible de demarrer de serveur: ", error.message);
    process.exit(1);
  }
};
startServer();
