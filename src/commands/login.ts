import { masa } from "../helpers";
import { config } from "../utils/config";

export const login = async () => {
  const result = await masa.session.login();

  if (result.cookie) {
    config.set("cookie", result.cookie);
  }
};
