import { config } from "../utils/storage";

export const patchMetadataUrl = (tokeUri: string) => {
  const apiUrl = config.get("api-url");
  const env = config.get("environment");

  if (tokeUri.indexOf("beta") > -1) {
    if (apiUrl.indexOf("localhost") > -1 || apiUrl.indexOf("127.0.0.1") > -1) {
      return tokeUri.replace("https://beta.metadata.masa.finance/", apiUrl);
    } else {
      return tokeUri.replace("beta", env);
    }
  }
  return tokeUri;
};
