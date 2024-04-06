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

    const scheduledEvents = [];

    do {
      const fromBlock = lastBlockNumber
        ? lastBlockNumber - offset * (x + 1)
        : 0;

      const toBlock = lastBlockNumber ? lastBlockNumber - offset * x : "latest";

      scheduledEvents.push(
        ...(await timelock.queryFilter(
          timelock.filters.CallScheduled(),
          fromBlock,
          toBlock,
        )),
      );

      x++;
    } while (scheduledEvents.length <= 10 && x < maxCount);

    console.log(
      network.chainNameShort,
      await Promise.all(
        scheduledEvents.map(async (log) => {
          const block = await log.getBlock();
          const startDate = new Date(block.timestamp * 1000);
          const delay = log.args.delay.toNumber();
          const endDate = new Date(startDate.getTime() + delay * 1000);

          const [done, ready, pending] = await Promise.all([
            timelock.isOperationDone(log.args.id),
            timelock.isOperationReady(log.args.id),
            timelock.isOperationPending(log.args.id),
          ]);

          return {
            id: log.args.id,
            startDate: startDate.toLocaleString(),
            endDate: endDate.toLocaleString(),
            expired: endDate.getTime() < Date.now(),
            done,
            ready,
            pending,
            block: block.number,
            target: log.args.target,
            data: log.args.data,
            delay,
          };
        }),
      ),
      verbose ? `Parsed ${offset * maxCount} blocks!` : "",
    );

    provider._websocket.close();
  }
};
