import { masa } from "../helpers/masa";

export const logout = async () => {
  await masa.session.logout();
};
