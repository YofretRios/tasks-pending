import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTasks, fetchTask, createTask } from '../modules/tasks';

export function useTasks() {
  const { data, isLoading, isFetching } = useQuery(['tasks'], async () => await fetchTasks());

  return { data, isLoading, isFetching };
}

export function useTask(id) {
  const { data, isLoading, isFetching } = useQuery(['tasks', id], async () => await fetchTask(id));

  return { data, isLoading, isFetching };
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
    },
    // Optmistic query implementation
    // onMutate handler will be called right away after triggering a mutation
    onMutate: (newData) => {
      // Create the soon to be task
      const task = {
        ...newData,
        _id: 'temp_id',
        completed: false,
        createdAt: null,
        updatedAt: null,
        mutating: true
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
      }
    }
  });

  return mutate;
}
