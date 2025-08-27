import type { Context } from '..';
import type { Post } from '../generated/prisma';

export interface PostArgs {
  post: { title?: string; content?: string };
}

interface PostPayloadType {
  userErrors: { message: string }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    _: null,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
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
        authorId: 1,
      },
    });

    return { userErrors: [], post: newPost };
  },

  postUpdate: async (
    _: null,
    { post, postId }: { postId: string; post: PostArgs['post'] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const title = post?.title?.trim();
    const content = post?.content?.trim();

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

    const data: PostArgs['post'] = {};
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
    { prisma }: Context
  ) => {
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
};
