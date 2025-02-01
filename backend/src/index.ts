import express from "express";
import authRoutes from "@routers/auth.router";
import categoryRoutes from "@routers/category.router";
import uploaderRoutes from "@routers/uploader.router";
import blogRoutes from "@routers/blog.router";
import userRoutes from "@routers/users.router";

const app = express();
const PORT = process.env.port || 8000;

app.use(express.json({ limit: "50mb" }));

const useRoutes = (app: express.Application) => {
  app.use("/auth", authRoutes);
  app.use(uploaderRoutes);
  app.use(categoryRoutes);
  app.use(blogRoutes);
  app.use(userRoutes);
};

useRoutes(app);

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
