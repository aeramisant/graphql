import { Context } from '..';

export const Query = {
  hello: () => 'God OF Code',
  posts: async (parent: any, args: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
    return posts;
  },
};
