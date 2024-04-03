import {
  Masa,
  Network,
  NetworkName,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import addresses from "@masa-finance/masa-token/addresses.json";
import { TimeLock, TimeLock__factory } from "@masa-finance/masa-token";
import { constants, providers, VoidSigner } from "ethers";

const TimeLockAddresses = addresses as unknown as {
  [key in NetworkName]: {
    TimeLock: string;
  };
};

export const timelock = async (
  testnets: boolean = false,
  verbose?: boolean,
) => {
  console.log("Masa Token Timelock viewer");

  const masaTimelockNetworks: Network[] = Object.keys(TimeLockAddresses)
    .filter((network) => !!TimeLockAddresses[network as NetworkName].TimeLock)
    .map((network) => SupportedNetworks[network as NetworkName])
    .filter(
      (network) => !!network && network.isTestnet === testnets,
    ) as Network[];

  for (const network of masaTimelockNetworks) {
    const provider = new providers.WebSocketProvider(
      (network.rpcUrls[3] ? network.rpcUrls[3] : network.rpcUrls[2])!,
    );

    const networkMasa = new Masa({
      networkName: network.networkName,
      signer: new VoidSigner(constants.AddressZero, provider),
    });

    const timelock: TimeLock = TimeLock__factory.connect(
      TimeLockAddresses[network.networkName].TimeLock,
      networkMasa.config.signer,
    );

    const lastBlockNumber =
      await networkMasa.config.signer.provider?.getBlockNumber();

    const offset = 3_333;
    const maxCount = 25;
    let x = 0;

    const events = [];

    do {
      const fromBlock = lastBlockNumber
        ? lastBlockNumber - offset * (x + 1)
        : 0;

      const toBlock = lastBlockNumber ? lastBlockNumber - offset * x : "latest";

      events.push(
        ...(await timelock.queryFilter(
          timelock.filters.CallScheduled(),
          fromBlock,
          toBlock,
        )),
      );
      x++;
    } while (events.length <= 10 && x < maxCount);

    console.log(
      network.chainNameShort,
      await Promise.all(
        events.map(async (log) => {
          const block = await log.getBlock();

          return {
            id: log.args.id,
            date: new Date(block.timestamp * 1000).toLocaleString(),
            block: block.number,
            target: log.args.target,
            data: log.args.data,
            delay: log.args.delay.toString(),
          };
        }),
      ),
      verbose ? `Parsed ${offset * maxCount} blocks!` : undefined,
    );

    provider._websocket.close();
  }
};
