import Head from "next/head";
import { useAuth, me } from "../modules/auth.js";

/**
 * Grab TM_SSESION from server side and request profile, this will load right away if available
 */
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.TM_SESSION;
  let user = null;

  if (token) {
    user = await me(req.cookies.TM_SESSION);
  }

  return { props: { user } }; 
}

export default function Home({ user }) {
  // TODO: Set user data into React Query;
  console.log(user);

  const { signin } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    await signin(email, password);
  };

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple Task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Tasks Masters
      </h1>

      <form className="max-w-lg m-auto" onSubmit={onSubmit}>
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue="riosmerca28@gmail.com"
          className="mt-1 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />

        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue="232412Zero"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />

        <div className="text-center py-4">
          <button
            type="submit"
            className="py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </div>
      </form>
    </>
  );
}
