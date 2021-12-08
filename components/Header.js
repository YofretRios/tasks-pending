import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../modules/auth';
import { useUser } from '../hooks/useUser';

const tailwindLogo = ({ src }) => {
  return `https://tailwindui.com/img/logos${src}`;
};

export default function Header() {
  const { signout } = useAuth();
  const { user: userData } = useUser();

  const onClick = () => {
    signout();
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="flex-shrink-0">
                  <div className="block lg:hidden h-8 w-auto">
                    <Image
                      loader={tailwindLogo}
                      src="/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                      width={35}
                      height={32}
                    />
                  </div>
                  <div className="hidden lg:block h-8 w-auto">
                    <Image
                      loader={tailwindLogo}
                      src="/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                      width={142}
                      height={32}
                    />
                  </div>
                </a>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/tasks">
                  <a
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Tasks
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {userData && (
            <div className="ml-auto">
              <span className="text-white px-3 py-2 rounded-md text-sm font-medium">
                {userData.name}
              </span>
              <button
                type="button"
                onClick={onClick}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/tasks">
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Tasks
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
