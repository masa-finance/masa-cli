import { loadIdentityContracts } from "../helpers/contracts";

export const loadIdentity = async (address: string) => {
  const identityContracts = await loadIdentityContracts();

  let identityId;

  try {
    identityId = await identityContracts.SoulboundIdentityContract.tokenOfOwner(
      address
    );
  } catch {
    // ignore
  }

  if (!identityId) {
    console.error(`No identity for '${address}'!`);
  }

  return identityId;
};
