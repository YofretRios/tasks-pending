import dynamic from 'next/dynamic';

// Get Header without SSR
const Header = dynamic(() => import('./Header'), { ssr: false });

// import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-2 py-10 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
