import { ITask } from "../interfaces";
import { baseUrl, headers } from "../lib/network";

export default async function fetchTasks(): Promise<ITask[]> {
  try {
    const resp = await fetch(baseUrl + "/api/task/all", {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    const tasks = await resp.json();
    if (resp.status === 401) {
      window.location.href = "/login";
    }
    console.log(`fetched all tasks`);
    return tasks as ITask[];
  } catch (err) {
    console.log(err);
    return [];
  }
}
