import { userSessionIdPrefix, redisSessionPrefix } from '../../constants';
import { ResolverMap } from '../../types/graphql-utils';
import { removeAllUsersSessions } from '../../utils/removeAllUsersSessions';

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => 'dummy',
  },
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      // return new Promise((res) =>
      //   session.destroy((err) => {
      //     if (err) {
      //       console.log('logout error');
      //     }
      //     res(true);
      //   })
      // );

      const { userId } = session;

      if (userId) {
        removeAllUsersSessions(userId, redis);
        return true;
      }

      return false;
    },
  },
};
