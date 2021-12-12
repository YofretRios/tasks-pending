import { http, getAuthorizationHeader } from '../http/index.js';
import { readCookie } from '../utils/cookie';

export async function fetchTasks(limit = 10, skip = 0) {
  try {
    const token = readCookie('TM_SESSION');

    const { data } = await http(`/tasks?limit=${limit}&skip=${skip}&sortBy=createdAt:desc`, {
      method: 'get',
      headers: getAuthorizationHeader(token),
    });

    return data;
  } catch (ex) {
    return { error: 'Can not retrieve taks' };
  }
}

export async function fetchTask(id, signal) {
  try {
    const token = readCookie('TM_SESSION');

    const { data } = await http(`/tasks/${id}3`, {
      method: 'get',
      headers: getAuthorizationHeader(token),
      signal, // making a query cancellable
    });

    return data;
  } catch (ex) {
    throw new Error('Unable to retreive specific task');
  }
}

export async function createTask(taskData) {
  try {
    const token = readCookie('TM_SESSION');

    return http('/tasks', {
      data: taskData,
      method: 'post',
      headers: getAuthorizationHeader(token),
    });
  } catch (ex) {
    return { error: 'Can not create task' };
  }
}

export async function updateTask({ id, ...rest }) {
  try {
    const token = readCookie('TM_SESSION');

    return http(`/tasks/${id}`, {
      data: rest,
      method: 'patch',
      headers: getAuthorizationHeader(token),
    });
  } catch (ex) {
    return { error: 'Can not create task' };
  }
}
