// import { User } from '../../entity/User';
// import { logger } from '../../utils/logger';
import { Resolver } from '../../types/graphql-utils';

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // if (!context.session || !context.session.userId) {
  //   throw Error('no cookie');
  // }

  // check if user is an admin
  // const user = await User.findOne({ where: { id: context.session.userId } });
  // if (!user || !user.admin) {
  //   throw Error('not admin sorry');
  //   return null;
  // }

  // middleware
  return resolver(parent, args, context, info);
  // afterware
};
