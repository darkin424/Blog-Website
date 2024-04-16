//post.service.ts
import { prisma } from "../index";

export const createRecipe = async (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  const { title, body, userId } = data;

  //Create the recipe
  const recipe = await prisma.post.create({
    data: {
      title,
      body,
      userId,
    },
  });

  return recipe;
};

export const getAllRecipes = async () => {
  //Get all recipes
  const recipes = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
  });

  return recipes;
};

export const getRecipeById = async (id: number) => {
  //Get recipe by id and include the user
  const recipe = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return recipe;
};