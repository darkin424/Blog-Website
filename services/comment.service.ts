//comments.service.ts
import { prisma } from "../index";

export const createComment = async (data: {
  body: string;
  postId: number;
  userId: number;
}) => {
  try {
    const { body, postId, userId } = data;

    //Create the comment for the recipe with the given id
    const comment = await prisma.comment.create({
      data: {
        body,
        userId,
        postId: postId,
      },
    });

    return comment;
  } catch (error: any) {
    throw error;
  }
};

export const getAllCommentsForRecipe = async (postId: number) => {
  //Get all comments for the recipe with the given id
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return comments;
};
