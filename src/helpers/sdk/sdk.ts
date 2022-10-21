import { ethers } from "ethers";
import { login } from "../../commands";
import { logout } from "./session/logout";
import { checkLogin } from "./session/check-login";
import { creditScoreMint, sessionLogout } from "./helpers/client";
import { loadIdentity } from "./identity/load-identity";
import { loadIdentityContracts } from "./helpers/contracts";
import { addresses } from "@masa-finance/tools";
import { version } from "./helpers/version"

export default class Masa {
  _provider;

  constructor({ provider }: { provider: ethers.providers.JsonRpcProvider }) {
    this._provider = provider;
  }

  session = {
    checkLogin,
    sessionLogout,
    login,
    logout,
  };

  identity = {
    loadIdentity,
  };

  creditScore = {
    creditScoreMint,
  };

  utils = {
    version,
  };

  contracts = {
    loadIdentityContracts,
    addresses,
  };
}
