//index.ts
import Elysia from "elysia";
import { recipeController } from "./controllers/post.controller";
import { PrismaClient } from "@prisma/client";
import { userController } from "./controllers/user.controller";
import { commentController } from "./controllers/comments.controller";

//Create instances of prisma and Elysia
const prisma = new PrismaClient();
const app = new Elysia();

//Use controllers as middleware
app.use(userController as any);
app.use(recipeController as any);
app.use(commentController as any);

//Listen for traffic
app.listen(4040, () => {
  console.log("Server is running on port 4040");
});

export { app, prisma };