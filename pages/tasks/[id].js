import Head from 'next/head';
import Switch from '../../components/Switch';
import NotFound from '../../components/NotFound';
import { useTask, useUpdateTask } from '../../hooks/task';

export function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}

export default function Task({ id }) {
  const { data, isLoading, error } = useTask(id);
  const updateTask = useUpdateTask();

  const updateState = (value) => {
    updateTask({ id, completed: value });
  };

  const updateDescription = (event) => {
    event.preventDefault();
    const description = event.target.elements.desc.value;

    if (!description) {
      return;
    }

    updateTask({ id, description});
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <NotFound />;
  }

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
                <form onSubmit={updateDescription}>
                  <input
                    type="text"
                    name="desc"
                    id="desc"
                    defaultValue={data.description}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </form>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Completed</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Switch onToggle={updateState} status={data.completed} />
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
