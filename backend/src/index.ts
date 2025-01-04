import express from "express";
import authRoutes from "@routers/auth.router";

const app = express();
const PORT = process.env.port || 8000;

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
