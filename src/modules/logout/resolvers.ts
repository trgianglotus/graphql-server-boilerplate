import { userSessionIdPrefix, redisSessionPrefix } from '../../constants';
import { ResolverMap } from '../../types/graphql-utils';

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
        const sessionIds = await redis.lrange(
          `${userSessionIdPrefix}${userId}`,
          0,
          -1
        );

        const promises = [];
        for (let i = 0; i < sessionIds.length; i += 1) {
          promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
        }
        await Promise.all(promises);
        return true;
      }

      return false;
    },
  },
};
