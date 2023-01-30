import { masa } from "../helpers";
import { config } from "../utils/config";

export const logout = async () => {
  await masa.session.logout();
  config.delete("cookie");
};
