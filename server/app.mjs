import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import authRoutes from './routes/auth.mjs'; // Uncomment and add your route files as needed
import { connectToDatabase } from "./db/conn.mjs";
import path from "path";
import authRouter from "./routes/authRouter.mjs"
import adminRouter from "./routes/adminRouter.mjs"
import userRouter from "./routes/userRouter.mjs"
import requireAuth from "./middleware/requireAuth.mjs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method}\t ${new Date().toLocaleString()}\t ${req.url}`);
  next();
});

// routes
app.get("/", (req, res) => {
  res.send("Authentication Server");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", requireAuth, adminRouter);
app.use("/api/user", requireAuth, userRouter);
// Connect to MongoDB and start server
connectToDatabase()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log("Error in starting server");
        return;
      }
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
