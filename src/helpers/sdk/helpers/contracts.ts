import { loadContracts } from "@masa-finance/tools"
import { config } from "../../../utils/config"
import { provider } from "../../../utils/ethers"

export const loadIdentityContracts = async () => {
  return loadContracts({
    provider,
    network: config.get("network") as string,
  });
};
