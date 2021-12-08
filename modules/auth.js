import { http, getAuthorizationHeader } from '../http/index.js';
import { setCookie } from '../utils/cookie';
import { useUser } from '../hooks/useUser';

export async function me(token) {
  try {
    const { data } = await http('/users/me', {
      method: 'get',
      headers: getAuthorizationHeader(token),
    });

    return data;
  } catch (ex) {
    console.log(ex.message);
    return null;
  }
}

export function useAuth() {
  const { updateUser } = useUser();

  async function signin(email, password) {
    try {
      const { data } = await http('/users/login', {
        method: 'post',
        data: { email, password },
      });

      setCookie('TM_SESSION', data.token, 30);
      setCookie('USER', JSON.stringify(data.user), 30);

      updateUser(data.user);

      return data;
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }

  return { signin, me };
}
