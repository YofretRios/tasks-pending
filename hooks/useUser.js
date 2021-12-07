// import { me } from "../modules/auth";
// import { setKey } from "../utils/appStorage";
import { useQueryClient } from "react-query";

export function useUser() {
  const queryClient = useQueryClient();
  // const user = getKey("user");

  // const { data } = useQuery("user", me, {
  //   initialData: user,
  //   onSucces: (received) => {
  //     if (!received) {
  //       clearKey('user');
  //     }
  //   },
  // });

  function updateUser(user) {
    queryClient.setQueryData('user', user);
  }

  function clearUser() {
    queryClient.setQueryData('user', null);
  }

  return { updateUser, clearUser };
}
