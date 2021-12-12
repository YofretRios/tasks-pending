import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTasks, fetchTask, createTask, updateTask } from '../modules/tasks';

export function useTasks() {
  const { data, isLoading, isFetching, error } = useQuery(
    ['tasks'],
    async () => await fetchTasks(),
    {
      refetchOnMount: true, // Will refetch on mount if the data is stale
    }
  );

  return { data, isLoading, isFetching, error };
}

export function useTask(id) {
  const queryClient = useQueryClient();
  const {
    data = {},
    isLoading,
    isFetching,
    error,
  } = useQuery(['tasks', id], async ({ signal }) => await fetchTask(id, signal));

  function cancel() {
    queryClient.cancelQueries(['tasks', id]);
  }

  return { data, isLoading, isFetching, error, cancel };
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((data) => createTask(data), {
    // Will be called after mutation has been resolved
    onSuccess: () => {
      toast.success('Task saved!');
    },
    // Optmistic query implementation
    // onMutate handler will be called right away after triggering a mutation
    onMutate: (newData) => {
      // Create temporary task
      const task = {
        ...newData,
        _id: 'temp_id',
        completed: false,
        createdAt: null,
        updatedAt: null,
        mutating: true, // client flag that indicates that this is a temporary task
      };

      // Generate and optimistic version of the current tasks array
      const previousData = queryClient.getQueryData('tasks');
      const newTasks = [task, ...previousData];
      newTasks.pop();

      // Update our current cash with our optimistic rendered version
      queryClient.setQueryData('tasks', newTasks);

      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context.previousData) {
        queryClient.invalidateQueries(['tasks'], context.previousData);

        toast.error('Unable to create task');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  return mutate;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((data) => updateTask(data), {
    onSuccess: () => {
      toast.success('Task Updated!');
    },
    onMutate: (newData) => {
      // Optimistic Rendering
      const previousData = queryClient.getQueryData(['tasks', newData.id]);
      const tempTask = {
        ...previousData,
        ...newData,
      };

      queryClient.setQueryData(['tasks', newData.id], tempTask);

      return { previousData };
    },
    onError: (error, data, context) => {
      // Roll back mutation
      if (context.previousData) {
        const { _id } = context.previousData;

        queryClient.setQueryData(['tasks', _id], context.previousData);
      }
    },
    onSettled: () => {
      // Tell react-query to invalidate the main list
      queryClient.invalidateQueries(['tasks'], { exact: true });
    },
  });

  return mutate;
}
