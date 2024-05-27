export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://tsm-tsx-backend.vercel.app";

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
