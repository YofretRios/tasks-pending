import { useQuery } from 'react-query';
import { fetchTasks, fetchTask } from '../modules/tasks';

export function useTasks() {
  const { data, isLoading, isFetching } = useQuery(['tasks'], async () => await fetchTasks());

  return { data, isLoading, isFetching };
}

export function useTask(id) {
  const { data, isLoading, isFetching } = useQuery(['tasks', id], async () => await fetchTask(id));

  return { data, isLoading, isFetching };
}
