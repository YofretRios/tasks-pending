import dynamic from 'next/dynamic';
// import Header from './Header';
// Prevent Header from rendering on the server to avoid missmatch HTML
const Header = dynamic(() => import('./Header'), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-2 py-10 sm:px-6 lg:px-8 relative">
        {children}
      </main>
    </>
  );
}
