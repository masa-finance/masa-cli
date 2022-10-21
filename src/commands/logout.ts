import { middlewareClient } from "../utils/client";
import { config } from "../utils/config";
import { checkLogin } from "../helpers/check-login";

export const logout = async () => {
  console.log("Logging out");

  if (await checkLogin()) {
    // load cookie
    const cookie = config.get("cookie") as string;

    const logoutResponse = await middlewareClient
      .post(`/session/logout`, undefined, {
        headers: {
          cookie: [cookie],
        },
      })
      .catch((err: any) => {
        console.error(err.message);
      });

    if (logoutResponse) {
      const { data: logoutData } = logoutResponse;
      console.log(`Logout: ${logoutData.status}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
