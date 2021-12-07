import { http, getAuthorizationHeader } from "../http/index.js"; 
import { setCookie } from '../utils/cookie';
import { useUser } from '../hooks/useUser';

export async function me(token) {
  try {
    const { data } = await http("/users/me", {
      method: "get",
      headers: getAuthorizationHeader(token),
    });

    return data;
  } catch (ex) {
    console.log(ex.message);
    return { error: 'Unable to fetch online profile' }
  }
}

export function useAuth() {
  const { updateUser } = useUser();

  async function signin(email, password) {
    try {
      const { data } = await http("/users/login", {
        method: "post",
        data: { email, password },
      });

      updateUser(data.user);
      setCookie('TM_SESSION', data.token, 30);

      return data;
    } catch (ex) {
      console.log(ex.message);
      return { error: 'Unable to login with your email or password' }
    }
  }

  return { signin, me };
}
