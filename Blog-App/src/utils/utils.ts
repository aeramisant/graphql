import JWT from 'jsonwebtoken';
import { JSON_SIGNATURE } from '../keys';
import type { PrismaClient } from '@prisma/client';

interface CanUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: PrismaClient;
}

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, JSON_SIGNATURE) as { userId: number };
  } catch (error) {
    console.log(error);
  }
};

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePostParams) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return {
      userErrors: [{ message: 'User not found!' }],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (post.authorId !== user.id) {
    return {
      userErrors: [{ message: 'Post does not owned by this user!' }],
      post: null,
    };
  }
};
