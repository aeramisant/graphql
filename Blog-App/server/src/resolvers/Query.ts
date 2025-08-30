import type { Context } from '..';

export const Query = {
  me: (parent: null, args: null, { prisma, userInfo }: Context) => {
    if (!userInfo?.userId) {
      return null;
    }
    return prisma.user.findUnique({ where: { id: userInfo.userId } });
  },

  profile: (
    parent: null,
    { userId }: { userId: string },
    { prisma }: Context
  ) => {
    if (!userId) {
      return null;
    }
    return prisma.profile.findUnique({ where: { id: Number(userId) } });
  },

  posts: async (parent: null, args: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: 'desc' }],
    });
    return posts;
  },
};
