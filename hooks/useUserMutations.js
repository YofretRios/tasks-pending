import { useQueryClient } from 'react-query';

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