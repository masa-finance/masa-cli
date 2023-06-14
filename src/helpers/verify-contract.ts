import { masa } from "./masa";
import axios from "axios";

export const verifyContract = async (
  apiUrl: string,
  etherscanKey: string,
  address: string,
  name: string,
  abiEncodedConstructorArguments: string,
  sourceCode: string
) => {
  console.log(`Verifying contract ${address}`);

  // give etherscan some time to catch up
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const verifysourcecodeParameters = {
    apikey: etherscanKey,
    module: "contract", //Do not change
    action: "verifysourcecode", //Do not change
    contractaddress: address,
    sourceCode,
    codeformat: "solidity-single-file",
    contractname: name,
    // todo get this from contracts
    compilerversion: "v0.8.8+commit.dddeac2f",
    // todo get this from contracts
    optimizationUsed: 1,
    // todo get this from contracts
    runs: 1,
    constructorArguements: abiEncodedConstructorArguments.replace("0x", ""),
    licenseType: 3,
  };

  const { data: verifysourcecodeResult } = await axios.post(
    apiUrl,
    verifysourcecodeParameters,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { result: guid, status } = verifysourcecodeResult;

  if (masa.config.verbose) {
    console.dir({ verifysourcecodeResult }, { depth: null });
  }

  if (status === "1") {
    let outcome: string;
    do {
      const { data: checkverifystatusResult } = await axios.get(apiUrl, {
        data: {
          apikey: etherscanKey,
          guid,
          module: "contract",
          action: "checkverifystatus",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Verifying ...");

      if (masa.config.verbose) {
        console.dir({ checkverifystatusResult }, { depth: null });
      }

      outcome = checkverifystatusResult.result;

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } while (outcome === "Pending in queue");

    if (outcome.indexOf("Fail") > -1) {
      console.error(`Verification failed: ${outcome}`);
    } else {
      console.log("Contract verified!");
    }
  } else {
    console.error(`Verification failed! ${guid}`);
  }
};
