import {
  loadOFTContract,
  Masa,
  Network,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import { constants, providers, utils, VoidSigner } from "ethers";

export const mesh = async (testnets: boolean = false, verbose?: boolean) => {
  console.log("Masa Token Mesh viewer");

  if (testnets) {
    console.info("Using testnet data");
  }

  const masaTokenNetworks: Network[] = Object.values(SupportedNetworks).filter(
    (network: Network) =>
      network.addresses?.tokens?.MASA && network.isTestnet === testnets,
  );

  for (const network of masaTokenNetworks) {
    const networkMasa = new Masa({
      networkName: network.networkName,
      signer: new VoidSigner(
        constants.AddressZero,
        new providers.JsonRpcProvider(network.rpcUrls[0]),
      ),
    });

    const networkOFT = loadOFTContract(networkMasa);

    if (!networkOFT) {
      console.error("Loading network OFT failed!");
      continue;
    }

    for (const peerNetwork of masaTokenNetworks) {
      if (peerNetwork.networkName === network.networkName) {
        continue;
      }

      const peerMasa = new Masa({
        networkName: peerNetwork.networkName,
        signer: new VoidSigner(
          constants.AddressZero,
          new providers.JsonRpcProvider(peerNetwork.rpcUrls[0]),
        ),
      });

      const peerOFT = loadOFTContract(peerMasa);

      if (!peerOFT) {
        console.error("Loading peer OFT failed!");
        continue;
      }

      const isPeer = await networkOFT.isPeer(
        peerNetwork.lzEndpointId ?? 0,
        utils.zeroPad(peerOFT.address, 32),
      );

      if (!isPeer) {
        const peer = await networkOFT.peers(peerNetwork.lzEndpointId ?? 0);

        if (peer !== utils.hexZeroPad(constants.AddressZero, 32)) {
          console.info({ peer });
        }
      }

      console.log(
        `${network.chainNameShort}(${network.lzEndpointId}) -> ${peerNetwork.chainNameShort}(${peerNetwork.lzEndpointId}): ${isPeer}`,
      );

      if (verbose) {
        console.log(`${networkOFT.address} -> ${peerOFT.address}`);
      }
    }
  }
};
