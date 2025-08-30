import type { Context } from '..';

interface UserParentType {
  id: number;
}

export const User = {
  posts: (
    parent: UserParentType,
    _args: null,
    { prisma, userInfo }: Context
  ) => {
    const isOwner = userInfo?.userId === parent.id;
    return prisma.post.findMany({
      where: {
        authorId: parent.id,
        ...(isOwner ? {} : { published: true }),
      },
      orderBy: { createdAt: 'desc' },
    });
  },
};
