import { ITask, TaskStatus } from "../interfaces";
import { baseUrl, headers } from "../lib/network";

export default async function createTask(): Promise<ITask | null> {
  try {
    const resp = await fetch(baseUrl + "/api/task/create", {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        title: "",
        description: "",
        tags: [""],
        status: TaskStatus.NotStarted,
        projectId: "",
        dueDate: "",
      }),
    });
    const newTask: ITask = await resp.json();
    if (resp.status === 401) {
      window.location.href = "/login";
    }
    console.log(`fetched all tasks`);
    return newTask as ITask;
  } catch (err) {
    console.log(err);
    return null;
  }
}
