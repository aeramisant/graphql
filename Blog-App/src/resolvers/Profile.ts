import type { Context } from '..';

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: (parent: ProfileParentType, args: null, { prisma }: Context) => {
    if (!parent) {
      return null;
    }
    return prisma.user.findUnique({ where: { id: parent.userId } });
  },
};
