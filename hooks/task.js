import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTasks, fetchTask, createTask, updateTask } from '../modules/tasks';

export function useTasks() {
  const { data, isLoading, isFetching } = useQuery(['tasks'], async () => await fetchTasks(), {
    refetchOnMount: true, // Will refetch on mount if the data is stale
  });

  return { data, isLoading, isFetching };
}

export function useTask(id) {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery(['tasks', id], async ({ signal }) => await fetchTask(id, signal));

  function cancel() {
    queryClient.cancelQueries(['tasks', id]);
  }

  return { data, isLoading, isFetching, cancel };
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((data) => createTask(data), {
    // Will be called after mutation has been resolved
    onSuccess: (response) => {
      const { data } = response;
      console.log('Query has been invalidated, here is the mutation results', data);

      // invalidate current query to trigger a new `/tasks` request
      queryClient.invalidateQueries(['tasks']);
      // TODO: use update query and invalite in case of error
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
        console.log('Opps, rollback to our previous data');
        // TODO: Rollback Query
      }
    },
  });

  return mutate;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((data) => updateTask(data), {
    onSuccess: (response) => {
      const { data } = response;

      queryClient.setQueryData(['tasks', data._id], data);
    },
    onMutate: (newData) => {
      // TODO: Optimistic rendering
      const previousData = queryClient.getQueryData(['tasks', newData.id]);
      const tempTask = {
        ...previousData,
        ...newData,
      };

      queryClient.setQueryData(['tasks', newData.id], tempTask);

      return { previousData };
    },
    onError: (error, data, context) => {
      if (context.previousData) {
        const { _id } = context.previousData;

        queryClient.setQueryData(['tasks', _id], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['tasks'], { exact: true });
    },
  });

  return mutate;
}
