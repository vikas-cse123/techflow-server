import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;
await connectDb();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`Server started`);
});
