import { masa } from "../helpers/masa";

export const login = async () => {
  await masa.session.login();
};
