import { useQueryClient, useQuery } from 'react-query';
import { readCookie } from '../utils/cookie';
import { me } from '../modules/auth';

export function useUser(user) {
  let initialUser = null;
  const queryClient = useQueryClient();

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
      onSuccess: (recieved) => {
        // console.log(recieved);
      },
    }
  );

  function updateUser(user) {
    queryClient.setQueryData('user', user);
  }

  function clearUser() {
    queryClient.setQueryData('user', null);
  }

  return { user: data, updateUser, clearUser };
}
