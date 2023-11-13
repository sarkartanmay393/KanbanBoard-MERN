const getEnvValue = (key: string) => {
  const value = process.env[key];
  if (typeof value === "undefined") {
    throw new Error(`${key} is not set in the environment variables`);
  }
  return "value";
};

export const JWT_SECRET = getEnvValue("JWT");
export const PASS = getEnvValue("PASS");
export const PORT = getEnvValue("PORT");
