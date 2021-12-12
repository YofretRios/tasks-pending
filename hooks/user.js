import { useQuery, useQueryClient } from 'react-query';
import { readCookie } from '../utils/cookie';
import { getProfile } from '../modules/auth';

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

  const { data, error } = useQuery(
    'user',
    async () => {
      let token = readCookie('TM_SESSION');

      return await getProfile(token);
    },
    {
      initialData: initialUser,
    }
  );

  return { user: data, error };
}

export function useUserMutations() {
  const queryClient = useQueryClient();

  function updateUser(user) {
    queryClient.setQueryData('user', user);
  }

  function clearUser() {
    queryClient.setQueryData('user', null);
  }

  return { updateUser, clearUser };
}
