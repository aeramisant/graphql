import type { Context } from '..';
import { userLoader } from '../loaders/userLoaders';

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: (parent: PostParentType, args: null, { prisma }: Context) => {
    return userLoader.load(parent.authorId);
  },
};
