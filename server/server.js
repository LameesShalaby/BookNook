import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import bookRouets from "./routes/bookRouets.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/books", bookRouets);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));