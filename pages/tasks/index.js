import { useState, Fragment, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
import CreateTaskModal from '../../components/CreateTaskModal';
import { useTasks } from '../../hooks/task.js';

export default function Tasks() {
  const [open, setOpen] = useState(false);

  const { data, isLoading, cancel } = useTasks();

  useEffect(() => {
    // cancel query on component unmount
    return cancel;
  }, [cancel]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>My Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateTaskModal open={open} setOpen={setOpen} />

      <div className="py-2">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="h-5 w-5" />
          Add Task
        </button>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Completed
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created At
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((task) => {
                    const mutatingClass = clsx(task.mutating && 'opacity-50');
                    const stateClass = clsx(
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      {
                        'bg-green-100 bg-green-100': task.completed,
                        'bg-yellow-100 bg-yellow-100': !task.completed,
                      }
                    );

                    return (
                      <tr key={task._id} className={mutatingClass}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {task.description}
                              </div>
                              <div className="text-sm text-gray-500">{task.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={stateClass}>
                            {task.completed ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/tasks/${task._id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">Details</a>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white py-3 flex items-center">
          <div className="flex-1 flex justify-end">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
