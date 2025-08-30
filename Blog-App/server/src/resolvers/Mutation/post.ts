import type { Context } from '../..';
import type { Post } from '../../generated/prisma';
import { canUserMutatePost } from '../../utils/utils';

export interface PostArgs {
  title?: string;
  content?: string;
}

interface PostPayloadType {
  userErrors: { message: string }[];
  post: Post | null;
}

export const postResolvers = {
  postCreate: async (
    _: null,
    { post }: { post: PostArgs; postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message:
              'Forbidden! You have to authenticate and provide a userId to be able to login.',
          },
        ],
        post: null,
      };
    }

    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message:
              'You have to provide Title and Content to be able to add new Post!',
          },
        ],
        post: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId as number,
      },
    });

    return { userErrors: [], post: newPost };
  },

  postUpdate: async (
    _: null,
    { post, postId }: { postId: string; post: PostArgs },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo || !userInfo.userId) {
      return {
        userErrors: [
          {
            message: 'Forbidden access (unauthenticated)',
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });

    if (error) return error;

    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: 'Need to have at least on e field to update',
          },
        ],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if ((!title && !content) || !existingPost) {
      return {
        userErrors: [
          {
            message:
              !title && !content
                ? 'You have to provide Title and Content to be able to add new Post!'
                : 'Could not find post.',
          },
        ],
        post: null,
      };
    }

    const data: PostArgs = {};
    if (title) data.title = title;
    if (content) data.content = content;

    const payload = await prisma.post.update({
      where: { id: Number(postId) },
      data: { ...data },
    });

    return { userErrors: [], post: payload };
  },

  postDelete: async (
    _: null,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ) => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message:
              'Forbidden! You have to authenticate and provide a userId to be able to login.',
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: Number(userInfo.userId),
      postId: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: 'Could not find post.',
          },
        ],
        post: null,
      };
    }

    const postDelete = await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return { userErrors: [], post: postDelete };
  },

  postPublish: async (
    _: null,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message:
              'Forbidden! You have to authenticate and provide a userId to be able to login.',
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: Number(userInfo.userId),
      postId: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userErrors: [],
      post: updatedPost,
    };
  },

  postUnpublish: async (
    _: null,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message:
              'Forbidden! You have to authenticate and provide a userId to be able to login.',
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: Number(userInfo.userId),
      postId: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        published: false,
      },
    });

    return {
      userErrors: [],
      post: updatedPost,
    };
  },
};
