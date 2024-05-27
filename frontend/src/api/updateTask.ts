import { ITask } from "../interfaces";
import { baseUrl, headers } from "../lib/network";

export default async function updateTask(
  task: Partial<ITask>
): Promise<ITask | null> {
  try {
    const resp = await fetch(baseUrl + "/api/task/update", {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(task),
    });

    const updatedTask: ITask = await resp.json();
    return updatedTask;
  } catch (err) {
    console.log(err);
    return null;
  }
}
