import { version as contractsVersion } from "@masa-finance/masa-contracts-identity/package.json";
import { version as sdkVersion } from "@masa-finance/tools/package.json";
import { version as cliVersion } from "../../../../package.json";

export const version = () => {
  return {
    contractsVersion,
    sdkVersion,
    cliVersion,
  };
};
