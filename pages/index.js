import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import Profile from '../components/Profile';
import { getProfile } from '../modules/auth';
import { useUser } from '../hooks/user';

/**
 * Grab TM_SSESION from server side and request profile, this will load right away if available
 */
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.TM_SESSION;
  let user = null;

  if (token) {
    user = await getProfile(req.cookies.TM_SESSION);
  }

  return { props: { user } };
}

export default function Home({ user }) {
  const { user: userData } = useUser(user);

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple Task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold text-gray-900 text-center">Tasks Masters</h1>

      {!userData ? <LoginForm /> : <Profile user={userData} />}
    </>
  );
}
