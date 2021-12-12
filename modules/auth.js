import { useRouter } from 'next/router';
import { http, getAuthorizationHeader } from '../http/index.js';
import { setCookie, readCookie, clearCookie } from '../utils/cookie';
import { useUserMutations } from '../hooks/user';

export async function getProfile(token) {
  try {
    const { data } = await http('/users/me', {
      method: 'get',
      headers: getAuthorizationHeader(token),
    });

    return data;
  } catch (ex) {
    throw new Error('Unable to fetch online profile');
  }
}

export function useAuth() {
  const { updateUser, clearUser } = useUserMutations();
  const router = useRouter();

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
      throw new Error('Unable to sign in');
    }
  }

  async function signout() {
    try {
      const token = readCookie('TM_SESSION');

      await http('/users/logout', {
        method: 'post',
        headers: getAuthorizationHeader(token),
      });

      clearCookie('TM_SESSION');
      clearCookie('USER');

      clearUser(null);
      router.replace('/');
    } catch (ex) {
      throw new Error('Unable to sign out');
    }
  }

  return { signin, signout };
}
