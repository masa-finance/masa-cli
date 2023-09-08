import { masa } from "./masa";
import axios from "axios";

export const verifyContract = async (
  apiUrl: string,
  etherscanKey: string,
  contractaddress: string,
  name: string,
  abiEncodedConstructorArguments: string,
  sourceCode: string,
) => {
  console.log(`Verifying contract '${contractaddress}'`);

  // give etherscan some time to catch up
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const verifySourcecodeParameters = {
    apikey: etherscanKey,
    module: "contract", //Do not change
    action: "verifysourcecode", //Do not change
    contractaddress,
    sourceCode,
    codeformat: "solidity-single-file",
    contractname: name,
    // todo get this from contracts
    compilerversion: "v0.8.8",
    // todo get this from contracts
    optimizationUsed: 1,
    // todo get this from contracts
    runs: 1,
    constructorArguements: abiEncodedConstructorArguments.replace("0x", ""),
    // MIT
    licenseType: 3,
  };

  const { data: verifySourcecodeResult } = await axios.post(
    apiUrl,
    verifySourcecodeParameters,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const { result: guid, status } = verifySourcecodeResult;

  if (masa.config.verbose) {
    console.dir({ verifySourcecodeResult }, { depth: null });
  }

  if (status === "1") {
    let outcome: string;
    do {
      const checkVerifyStatusParameters = {
        apikey: etherscanKey,
        guid,
        module: "contract",
        action: "checkverifystatus",
      };

      const { data: checkVerifyStatusResult } = await axios.get(apiUrl, {
        data: checkVerifyStatusParameters,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Verifying ...");

      if (masa.config.verbose) {
        console.dir({ checkVerifyStatusResult }, { depth: null });
      }

      outcome = checkVerifyStatusResult.result;

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
