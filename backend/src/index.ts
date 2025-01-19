import express from "express";
import authRoutes from "@routers/auth.router";
import categoryRoutes from "@routers/category.router";
import uploaderRoutes from "@routers/uploader.router";

const app = express();
const PORT = process.env.port || 8000;

app.use(express.json());

const useRoutes = (app: express.Application) => {
  app.use("/auth", authRoutes);
  app.use(uploaderRoutes);
  app.use(categoryRoutes);
};

useRoutes(app);

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
