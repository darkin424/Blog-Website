//comments.controller.ts
import Elysia from "elysia";
import {
  createComment,
  getAllCommentsForRecipe,
} from "../services/comment.service";
import { verifyToken } from "../services/auth.service";

export const commentController = (app: Elysia) => {
  app.post("/:postId/create-comment", async (context) => {
    try {
      const authHeader = context.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const postId = context.params.postId;

      if (!token) {
        throw new Error("Invalid token");
      }

      const verifiedToken = verifyToken(token as string);

      const commentData: any = context.body;

      const newComment = await createComment({
        body: commentData.body,
        postId: +postId,
        userId: verifiedToken?.id,
      });

      return newComment;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.get("/:postId/comments", async (context) => {
    try {
      const postId = context.params.postId;

      const comments = await getAllCommentsForRecipe(+postId);

      return {
        comments,
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });
};