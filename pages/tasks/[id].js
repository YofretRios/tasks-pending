import Head from 'next/head';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useTask } from '../../hooks/useTask.js';

export function getServerSideProps() {
  return { props: {} };
}

export default function Task() {
  const router = useRouter();
  const { data, isFetching } = useTask(router.query.id);

  if (isFetching) return <div>Loading...</div>;

  const stateClass = clsx('px-2 inline-flex text-xs leading-5 font-semibold rounded-full', {
    'bg-green-100 bg-green-100': data.completed,
    'bg-yellow-100 bg-yellow-100': !data.completed,
  });

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple Task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Task Info</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Id</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data._id}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data.description}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Completed</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className={stateClass}>{data.completed ? 'Completed' : 'Pending'}</span>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.createdAt}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Updated at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.updatedAt}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
