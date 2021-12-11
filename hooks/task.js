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
    onSuccess: (response) => {
      const { data } = response;
      console.log('Query has been invalidated, here is the mutation results', data);

      queryClient.invalidateQueries(['tasks']);
    },
  });

  return mutate;
}
