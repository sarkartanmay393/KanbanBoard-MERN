import { baseUrl, headers } from "../lib/network";

export default async function deleteTask(taskId: string): Promise<void> {
  try {
    const resp = await fetch(baseUrl + "/api/task/delete", {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ _id: taskId }),
    });

    await resp.json();
  } catch (err) {
    console.log(err);
  }
}
