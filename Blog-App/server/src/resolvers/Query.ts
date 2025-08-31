import type { Context } from '..';

export const Query = {
  me: (_parent: null, _args: null, { prisma, userInfo }: Context) => {
    if (!userInfo?.userId) {
      return null;
    }
    return prisma.user.findUnique({ where: { id: userInfo.userId } });
  },

  profile: async (
    _parent: null,
    { userId }: { userId: string },
    { prisma, userInfo }: Context
  ) => {
    if (!userId) {
      return null;
    }
    const isMyProfile = Number(userId) === userInfo?.userId;

    const profile = await prisma.profile.findUnique({
      where: { id: Number(userId) },
    });

    if (!profile) {
      return null;
    }

    return { ...profile, isMyProfile };
  },

  posts: async (_parent: null, _args: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: 'desc' }],
    });

    return posts;
  },
};
