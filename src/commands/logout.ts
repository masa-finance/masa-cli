import { middlewareClient } from "../utils/rest";
import { config } from "../utils/storage";
import { checkLogin } from "../helpers/check-login";

export const logout = async () => {
  if (await checkLogin()) {
    console.log("Logging out");

    const cookie = config.get("cookie");

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
      console.log("Logout:", logoutData.status);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
