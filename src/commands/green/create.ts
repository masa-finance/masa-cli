import { masa, readLine } from "../../helpers";
import {
  BaseResult,
  GenerateGreenResult,
  PaymentMethod,
  VerifyGreenResult,
} from "@masa-finance/masa-sdk";

export const create = async (
  paymentMethod: PaymentMethod,
  phoneNumber: string,
): Promise<void> => {
  console.log(`Creating Green for phone number: '${phoneNumber}'`);

  const generateResult: GenerateGreenResult =
    await masa.green.generate(phoneNumber);

  if (generateResult.success) {
    let verifyGreenResult: VerifyGreenResult | undefined;

    do {
      const code: string = await readLine(
        "The code that has been sent to your phone number: ",
      );
      verifyGreenResult = await masa.green.verify(phoneNumber, code);

      if (verifyGreenResult) {
        if (!verifyGreenResult.success) {
          console.error(
            `Verifying Green failed! '${verifyGreenResult.message}'`,
          );
        }

        if (verifyGreenResult.status === "429") {
          return;
        }
      }
    } while (!verifyGreenResult?.success);

    if (
      verifyGreenResult &&
      verifyGreenResult.authorityAddress &&
      verifyGreenResult.signatureDate &&
      verifyGreenResult.signature
    ) {
      let mintGreenResult: BaseResult;

      do {
        console.log(`Minting Green on '${masa.config.networkName}'`);

        mintGreenResult = await masa.green.mint(
          paymentMethod,
          verifyGreenResult.authorityAddress,
          verifyGreenResult.signatureDate,
          verifyGreenResult.signature,
        );

        if (mintGreenResult.tokenId) {
          console.log(
            `Green successfully minted on '${masa.config.networkName}' with token ID: '${mintGreenResult.tokenId}'`,
          );
        }
      } while (!mintGreenResult.tokenId);
    }
  } else {
    console.error(`Generating Green failed: '${generateResult.message}'`);
  }
};
