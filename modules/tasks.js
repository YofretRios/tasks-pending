import { http, getAuthorizationHeader } from '../http/index.js';
import { readCookie } from '../utils/cookie';

export async function fetchTasks(limit = 10, skip = 0) {
  try {
    const token = readCookie('TM_SESSION');

    const { data } = await http(`/tasks?limit=${limit}&skip=${skip}`, {
      method: 'get',
      headers: getAuthorizationHeader(token),
    });

    return data;
  } catch (ex) {
    return { error: 'Can not retrieve taks' };
  }
}

export async function fetchTask(id) {
  try {
    const token = readCookie('TM_SESSION');

    const { data } = await http(`/tasks/${id}`, {
      method: 'get',
      headers: getAuthorizationHeader(token),
    });

    return data;
  } catch (ex) {
    return { error: 'Can not retrieve taks' };
  }
}

export async function createTask(taskData) {
  try {
    const token = readCookie('TM_SESSION');
    // const { data } = await http('/tasks', {
    //   body: taskData,
    //   method: 'post',
    //   headers: getAuthorizationHeader(token),
    // });

    return http(
      '/tasks',
      {
        data: taskData,
        method: 'post',
        headers: getAuthorizationHeader(token),
      }
    );
  } catch (ex) {
    return { error: 'Can not create task' };
  }
}
