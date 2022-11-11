import { masa } from "../helpers";

export const logout = async () => {
  await masa.session.logout();
};
