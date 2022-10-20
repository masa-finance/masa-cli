export const unpackSessionId = (cookies: string[]): string | undefined => {
  return cookies[0].split(";")[0].split("=")[1];
};
