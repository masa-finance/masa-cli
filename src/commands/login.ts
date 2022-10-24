import { masa } from "../helpers/masa";
import { config } from "../utils/config";

export const login = async () => {
  const result = await masa.session.login();

  if (result) {
    console.log("cookie", result.cookie);
    config.set("cookie", result.cookie);
  }
};
