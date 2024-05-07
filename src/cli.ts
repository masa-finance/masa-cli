import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { version as cliVersion } from "../package.json";
import {
  account,
  asbtDeploy,
  asbtMint,
  asbtMintBulk,
  asbtMintFromSoulname,
  creditScoreBurn,
  creditScoreCreate,
  creditScoreInfo,
  creditScoreList,
  creditScoreLoad,
  dynamicSSSBTMint,
  dynamicSSSBTSetState,
  greenBurn,
  greenCreate,
  greenInfo,
  greenList,
  identityBurn,
  identityCreate,
  identityInfo,
  identityRegister,
  identityShow,
  login,
  logout,
  marketplacePointsInfo,
  marketplacePointsShow,
  marketplacePointsStake,
  oracleStake,
  oracleUnstake,
  sbtBurn,
  sbtInfo,
  sbtList,
  settingsPreset,
  settingsPresetNetwork,
  settingsSet,
  settingsShow,
  signSetStateDynamicSSSBT,
  soulNameBurn,
  soulNameCreate,
  soulNameInfo,
  soulNameList,
  soulNameRenew,
  soulNameResolve,
  soulNameResolveReverse,
  soulNameSend,
  soulNameShow,
  soulNameTail,
  soulNameVerify,
  sssbtAddAuthority,
  sssbtDeploy,
  sssbtMint,
  sssbtSign,
  tokenBridgeSend,
  tokenGovernanceMesh,
  tokenGovernanceTimelock,
  tokenStakingClaim,
  tokenStakingInfo,
  tokenStakingList,
  tokenStakingStake,
  tokenStakingUnlock,
  tokenWrapDeposit,
  tokenWrapWithdraw,
  version,
} from "./commands";
import { loadMasa, masa } from "./helpers";
import { MasaArgs, NetworkName } from "@masa-finance/masa-sdk";
import {
  breakLink,
  createLink,
  establishLink,
  listLinks,
  querylink,
  verifyLink,
} from "./commands/soul-linker/links";

clear();
console.log(
  chalk.red(figlet.textSync("Masa CLI", { horizontalLayout: "full" })),
);

let overrides: Partial<MasaArgs> & {
  privateKey?: string;
  rpcUrl?: string;
  soulNameContractAddress?: string;
  forceTransactions?: boolean;
} = {
  verbose: undefined,
  networkName: undefined,
  soulNameContractAddress: undefined,
};

program
  .option("-v, --version", "output the version number", () => {
    if (process.argv.indexOf("--version") > -1) {
      version();
    } else {
      console.log(`v${cliVersion}`);
    }
    process.exit(0);
  })
  .option("--verbose", "output with verbose logging", () => {
    console.log("Masa CLI running with verbose output!\n");
    overrides = {
      ...overrides,
      verbose: true,
    };
    loadMasa(overrides);
  })
  .option("-n, --network <network>", "Address override", (networkName) => {
    overrides = {
      ...overrides,
      networkName: networkName as NetworkName,
    };
    loadMasa(overrides);
  })
  .option(
    "-pk, --privateKey <private-key>",
    "Private Key override",
    (privateKey) => {
      overrides.privateKey = privateKey;
      loadMasa(overrides);
    },
  )
  .option("-r, --rpcUrl <rpc-url>", "RPC URL override", (rpcUrl) => {
    overrides.rpcUrl = rpcUrl;
    loadMasa(overrides);
  })
  .option("-f, --force", "Force transactions", () => {
    console.log("Masa CLI running with force!\n");
    overrides.forceTransactions = true;
    loadMasa(overrides);
  })
  .usage("[command] [subcommand] [arguments] [options]")
  .description("The Masa CLI");

program
  .command("login")
  .description("Login to the masa infrastructure")
  .action(() => login());

program
  .command("logout")
  .description("Logout from the masa infrastructure")
  .action(() => logout());

program
  .command("account")
  .option("-a, --address <address>", "Address override")
  .description("Shows information about your account")
  .action(({ address }) => account(address));

{
  const identity = program.command("identity").description("Identity commands");

  identity
    .command("info")
    .description("Shows info about all Identities")
    .action(() => identityInfo());

  identity
    .command("create")
    .argument("<soulname>", "Soul Name to register")
    .argument("<duration>", "Period of registration")
    .description("Creates a masa identity with soul name")
    .action((soulName: string, duration: number) =>
      identityCreate("ETH", soulName, duration),
    );

  identity
    .command("register")
    .description("Creates a masa identity without soul name")
    .action(() => identityRegister());

  identity
    .command("show")
    .option("-a, --address <address>", "Address override")
    .description("Shows detail about your masa identity")
    .action(({ address }) => identityShow(address));

  identity
    .command("burn")
    .description("Burns your masa identity")
    .action(() => identityBurn());
}

{
  const soulName = program
    .command("soul-name")
    .option(
      "-c, --contract <contract>",
      "Contract address override",
      (soulNameContractAddress) => {
        overrides.soulNameContractAddress = soulNameContractAddress;
        loadMasa(overrides);
      },
    )
    .description("Soul Name Commands");

  soulName
    .command("info")
    .description("Shows info about all Soul Names")
    .action(() => soulNameInfo());

  soulName
    .command("list")
    .description("Lists your soul names")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => soulNameList(address));

  soulName
    .command("tail")
    .description("Tails your soul names")
    .option("-l, --limit <limit>", "Limit")
    .action(({ limit }) => soulNameTail(limit));

  soulName
    .command("resolve")
    .description("Resolves a soul name to the address")
    .argument("<soulname>", "Soul Name to resolve")
    .action((soulName: string) => soulNameResolve(soulName));

  soulName
    .command("resolve-reverse")
    .description("Resolves an address to soul names")
    .argument("<soulname>", "Address to resolve")
    .action((address: string) => soulNameResolveReverse(address));

  soulName
    .command("create")
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a new soul name")
    .action((soulName: string, duration: number) =>
      soulNameCreate("ETH", soulName, duration),
    );

  soulName
    .command("burn")
    .argument("<soulname>", "Soul Name to burn")
    .description("Burns soul name that you own")
    .action((soulName: string) => soulNameBurn(soulName));

  soulName
    .command("renew")
    .argument("<soulname>", "Soul Name to burn")
    .argument("<years>", "Years to renew for")
    .description("Renews a soul name that you own")
    .action((soulName: string, years: number) =>
      soulNameRenew(soulName, years),
    );

  soulName
    .command("send")
    .argument("<soulname>", "Soul Name to send")
    .argument("<receiver>", "Receiver to receive the Soul Name")
    .description("Sends a soul name to that you own to a receiver")
    .action((soulName: string, receiver: string) =>
      soulNameSend(soulName, receiver),
    );

  soulName
    .command("show")
    .argument("<soulname>", "Soul Name to show")
    .description("Shows info about a Soul Name")
    .action((soulName: string) => soulNameShow(soulName));

  soulName
    .command("verify")
    .argument("<soulname>", "Soul Name to verify")
    .description("Verifies a Soul Name")
    .action((soulName: string) => soulNameVerify(soulName));
}

{
  const creditScore = program
    .command("credit-score")
    .description("Credit Score Commands");

  creditScore
    .command("info")
    .description("Shows info about all Credit Scores")
    .action(() => creditScoreInfo());

  creditScore
    .command("list")
    .description("Lists your Credit Scores")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => creditScoreList(address));

  creditScore
    .command("create")
    .description("Creates a Credit Score")
    .action(() => creditScoreCreate("ETH"));

  creditScore
    .command("burn")
    .argument("<credit-score-id>", "ID of the Credit Score to burn")
    .description("Burns a Credit Score")
    .action((creditScoreId) => creditScoreBurn(creditScoreId));

  creditScore
    .command("load")
    .argument("<credit-score-id>", "ID of the Credit Score to load")
    .description("Loads a Credit Score")
    .action((creditScoreId) => creditScoreLoad(creditScoreId));

  {
    const creditScoreLink = creditScore
      .command("link")
      .description("Credit Score Soul Linker Commands");

    creditScoreLink
      .command("create")
      .argument("<credit-score-id>", "ID of the Credit Score to grant access")
      .argument(
        "<reader-identity-id>",
        "ID of the identity that should receive access",
      )
      .description("Creates a Soul Linker Passport")
      .action((creditScoreId, readerIdentityId) =>
        createLink(masa.creditScore.links, creditScoreId, readerIdentityId),
      );

    creditScoreLink
      .command("establish")
      .argument("<passport>", "Masa Soul Linker passport")
      .description("Establishes a link to a Credit Score")
      .action((passport) =>
        establishLink(masa.creditScore.links, "ETH", passport),
      );

    creditScoreLink
      .command("query")
      .argument("<passport>", "Masa Soul Linker passport")
      .description("Queries a link to a Credit Score")
      .action((passport) => querylink(masa.creditScore.links, "ETH", passport));

    creditScoreLink
      .command("list")
      .argument(
        "<credit-score-id>",
        "ID of the Credit Score to list all the links of",
      )
      .description("Lists all soul links for a credit score id")
      .action((creditScoreId) =>
        listLinks(masa.creditScore.links, creditScoreId),
      );

    creditScoreLink
      .command("verify")
      .argument("<credit-score-id>", "ID of the Credit Score to grant access")
      .option(
        "-r, --reader-identity-id <reader-identity-id>",
        "ID of the identity that should receive access",
      )
      .description("Verifies a Soul Link")
      .action((creditScoreId, { readerIdentityId }) =>
        verifyLink(masa.creditScore.links, creditScoreId, readerIdentityId),
      );

    creditScoreLink
      .command("break")
      .argument("<credit-score-id>", "ID of the Credit Score to grant access")
      .argument(
        "<reader-identity-id>",
        "ID of the identity that should receive access",
      )
      .description("Breaks a Soul Link")
      .action((creditScoreId, readerIdentityId) =>
        breakLink(masa.creditScore.links, creditScoreId, readerIdentityId),
      );
  }
}

{
  const green = program.command("green").description("Green Commands");

  green
    .command("info")
    .description("Shows info about Masa Green")
    .action(() => greenInfo());

  green
    .command("list")
    .description("Lists your Greens")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => greenList(address));

  green
    .command("create")
    .argument("<phone-number>", "The phone number to verify")
    .description("Creates a Green Token")
    .action((phoneNumber: string) => greenCreate("ETH", phoneNumber));

  green
    .command("burn")
    .argument("<green-id>", "ID of the Green to burn")
    .description("Burns a green")
    .action((greenId) => greenBurn(greenId));
}

{
  const sbt = program.command("sbt").description("SBT Commands");

  sbt
    .command("info")
    .description("Shows info about an SBT")
    .argument("<contract-address>", "Address of the SBT to sign")
    .action((contractAddress: string) => sbtInfo(contractAddress));

  sbt
    .command("list")
    .description("Lists your SBTs")
    .argument("<contract-address>", "Address of the SBT contract to list")
    .option("-a, --address <address>", "Address override")
    .action((contractAddress: string, { address }) =>
      sbtList(contractAddress, address),
    );

  sbt
    .command("burn")
    .argument("<contract-address>", "Address of the SBT to sign")
    .argument("<sbt-id>", "ID of the SBT to burn")
    .description("Burns an SBT")
    .action((contractAddress: string, SBTId: string) =>
      sbtBurn(contractAddress, SBTId),
    );
}

{
  const asbt = program.command("asbt").description("ASBT Commands");

  asbt
    .command("deploy")
    .description("Deploys ASBTs")
    .option("-e, --etherscan-key <etherscan-key>", "Etherscan API Key")
    .action(({ etherscanKey }) => asbtDeploy(etherscanKey));

  asbt
    .command("mint")
    .description("Mints ASBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<receiver>", "Address of the SBT receiver")
    .action((contractAddress, receiver) => asbtMint(contractAddress, receiver));
  asbt
    .command("bulk-mint")
    .description("Mints ASBTs from CSV files")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<csv>", "Address of the SBT receiver")
    .action((contractAddress, csv) => asbtMintBulk(contractAddress, csv));

  asbt
    .command("mint-to-soulname")
    .description("Mints ASBTs from soulname")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<soulname>", "Address of the SBT receiver")
    .action((contractAddress, soulname) =>
      asbtMintFromSoulname(contractAddress, soulname),
    );
}

{
  const sssbt = program.command("sssbt").description("SSSBT Commands");

  sssbt
    .command("deploy")
    .description("Deploys SSSBTs")
    .option("-e, --etherscan-key <etherscan-key>", "Etherscan API Key")
    .action(({ etherscanKey }) => sssbtDeploy(etherscanKey));

  sssbt
    .command("add-authority")
    .description("Adds an Authority to the SSSBT")
    .argument(
      "<contract-address>",
      "Address of the SBT to add the authority to",
    )
    .argument("<authority-address>", "Address of the Authority")
    .action((contractAddress: string, authorityAddress: string) =>
      sssbtAddAuthority(contractAddress, authorityAddress),
    );

  sssbt
    .command("sign")
    .description("Signs SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<receiver>", "Address of the SBT receiver")
    .action((contractAddress: string, receiver: string) =>
      sssbtSign(contractAddress, receiver),
    );

  sssbt
    .command("mint")
    .description("Mints SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<authority-address>", "Address of the Authority")
    .argument("<signature-date>", "Signature date")
    .argument("<signature>", "Signature")
    .action(
      (
        contractAddress: string,
        authorityAddress: string,
        signatureDate: number,
        signature: string,
      ) =>
        sssbtMint(contractAddress, authorityAddress, signatureDate, signature),
    );
}

{
  const dynamicSSSBT = program
    .command("dynamic-sssbt")
    .description("Dynamic SSSBT Commands");

  dynamicSSSBT
    .command("add-authority")
    .description("Adds an Authority to the SSSBT")
    .argument(
      "<contract-address>",
      "Address of the SBT to add the authority to",
    )
    .argument("<authority-address>", "Address of the Authority")
    .action((contractAddress: string, authorityAddress: string) =>
      sssbtAddAuthority(contractAddress, authorityAddress),
    );

  dynamicSSSBT
    .command("set-state")
    .description("Sets a state on a dynamic SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<state>", "State")
    .argument("<state-value>", "State value")
    .argument("<authority-address>", "Address of the Authority")
    .argument("<signature-date>", "Signature date")
    .argument("<signature>", "Signature")
    .action(
      (
        contractAddress: string,
        state: string,
        stateValue: boolean,
        authorityAddress: string,
        signatureDate: number,
        signature: string,
      ) =>
        dynamicSSSBTSetState(
          contractAddress,
          state,
          Boolean(stateValue),
          authorityAddress,
          signatureDate,
          signature,
        ),
    );

  dynamicSSSBT
    .command("sign-set-state")
    .description("Signs a Set State operation on a Dynamic SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<receiver>", "Address of the SBT receiver")
    .argument("<state>", "State")
    .argument("<state-value>", "State value")
    .action(
      (
        contractAddress: string,
        receiver: string,
        state: string,
        stateValue: boolean,
      ) =>
        signSetStateDynamicSSSBT(
          contractAddress,
          receiver,
          state,
          Boolean(stateValue),
        ),
    );

  dynamicSSSBT
    .command("mint")
    .description("Mints Dynamic SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .action((contractAddress: string) => dynamicSSSBTMint(contractAddress));
}

{
  const oracle = program.command("oracle").description("Oracle commands");

  oracle
    .command("stake")
    .argument("<amount>", "Amount to stake")
    .action((amount: string) => oracleStake(amount));

  oracle
    .command("unstake")
    .argument("<amount>", "Amount to unstake")
    .action((amount: string) => oracleUnstake(amount));
}

{
  const marketplace = program
    .command("marketplace")
    .description("Marketplace commands");

  const points = marketplace.command("points");

  points
    .command("show")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => marketplacePointsShow(address));

  points
    .command("info")
    .description("Shows information about the points")
    .action(() => marketplacePointsInfo());

  points
    .command("stake")
    .argument("<address>", "Pool address")
    .option(
      "-t, --threshold <threshold>",
      "Number of points to skip before staking",
    )
    .action((address, { threshold }) =>
      marketplacePointsStake(address, threshold),
    );
}

{
  const token = program.command("token").description("Token commands");

  {
    const bridge = token.command("bridge").description("Bridge commands");

    bridge
      .command("send")
      .argument("<to>", "To network")
      .argument("<amount>", "Amount to send")
      .option("-s, --slippage <slippage>", "Slippage")
      .action((to: NetworkName, amount: string, { slippage }) =>
        tokenBridgeSend(to, amount, slippage),
      );
  }

  {
    const wrap = token.command("wrap").description("Wrapping commands");

    wrap
      .command("deposit")
      .argument("<amount>", "Amount to deposit")
      .action((amount: string) => tokenWrapDeposit(amount));

    wrap
      .command("withdraw")
      .argument("<amount>", "Amount to withdraw")
      .action((amount: string) => tokenWrapWithdraw(amount));
  }

  {
    const governance = token
      .command("governance")
      .description("Governance commands");

    governance
      .command("mesh")
      .option("-t, --testnets", "Show testnets")
      .action(({ testnets }) =>
        tokenGovernanceMesh(testnets, overrides.verbose),
      );

    governance
      .command("timelock")
      .option("-t, --testnets", "Show testnets")
      .action(({ testnets }) =>
        tokenGovernanceTimelock(testnets, overrides.verbose),
      );
  }

  {
    const staking = token.command("staking").description("Staking commands");

    staking
      .command("stake")
      .argument("<amount>", "Amount to stake")
      .argument("<duration>", "Duration to stake")
      .action((amount: string, duration: number) =>
        tokenStakingStake(amount, duration),
      );

    staking
      .command("unlock")
      .argument("<position>", "Index to unlock")
      .action((position: number) => tokenStakingUnlock(position));

    staking
      .command("claim")
      .argument("<position>", "Index to claim")
      .action((position: number) => tokenStakingClaim(position));

    staking
      .command("list")
      .option("-a, --address", "Address to list")
      .action(({ address }) => tokenStakingList(address));

    staking.command("info").action(() => tokenStakingInfo());
  }
}

{
  const settings = program
    .command("settings")
    .description("Set config settings");

  settings
    .command("set")
    .argument("<key>", "key to set")
    .argument("<value>", "value to set to key")
    .description("Changes setting <key> to <value>")
    .action((key: string, value: string | number) => settingsSet(key, value));

  settings
    .command("preset")
    .argument("<environment>", "The environment to use as preset")
    .description("Changes setting <environment> presets")
    .action((environment: string) => settingsPreset(environment));

  settings
    .command("preset-network")
    .argument("<network-name>", "The network to use as preset")
    .description("Changes setting <network-name> presets")
    .action((networkName: NetworkName) => settingsPresetNetwork(networkName));

  settings
    .command("show")
    .description("Shows config values")
    .action(() => settingsShow());
}

export default program;
