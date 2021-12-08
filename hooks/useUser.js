import { useQuery } from 'react-query';
import { readCookie } from '../utils/cookie';
import { me } from '../modules/auth';

export function useUser(user) {
  let initialUser = null;
  // Grab the user from argument
  // if not available, grab the user from client store
  if (user) {
    initialUser = user;
  } else {
    const storedUser = readCookie('USER');

    initialUser = storedUser && JSON.parse(storedUser);
  }

  const { data } = useQuery(
    'user',
    async () => {
      let token = readCookie('TM_SESSION');

      return await me(token);
    },
    {
      initialData: initialUser,
    }
  );

  return { user: data };
}
