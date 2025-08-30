import type { Context } from '..';

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: (parent: PostParentType, args: null, { prisma }: Context) => {
    if (!parent) {
      return null;
    }
    return prisma.user.findUnique({ where: { id: parent.authorId } });
  },
};
