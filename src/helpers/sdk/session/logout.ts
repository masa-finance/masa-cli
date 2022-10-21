import { sessionLogout } from "../helpers/client";
import { checkLogin } from "./check-login";

export const logout = async () => {
  console.log("Logging out");

  if (await checkLogin()) {
    const logoutData = await sessionLogout();

    if (logoutData) {
      console.log(`Logout: ${logoutData.status}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
