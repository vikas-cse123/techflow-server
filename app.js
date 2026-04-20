import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.auth.js"

const app = express();
const PORT = process.env.PORT || 4000;
await connectDb();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/blogs",blogRoutes)

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({ success: false, message:  "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`Server started`);
});
