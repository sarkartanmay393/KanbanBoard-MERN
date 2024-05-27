import { baseUrl, headers } from "../lib/network";

export default async function logout(): Promise<void> {
  try {
    await fetch(baseUrl + "/api/logout", {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    window.location.href = "/login";
  } catch (err) {
    console.error(err);
  }
}
