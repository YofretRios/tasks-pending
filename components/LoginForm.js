import { useAuth } from '../modules/auth';

export default function LoginForm() {
  const { signin } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    await signin(email, password);
  };

  return (
    <form className="max-w-lg m-auto" onSubmit={onSubmit}>
      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        defaultValue="riosmerca28@gmail.com"
        className="mt-1 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />

      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
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
  );
}
