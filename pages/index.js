import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple Task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold text-gray-900">Welcome Home</h1>
    </>
  )
}
