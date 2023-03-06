import { masa, readLine } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (
  paymentMethod: PaymentMethod,
  phoneNumber: string
) => {
  console.log(`Creating Green for phone number: '${phoneNumber}'`);

  const generateResult = await masa.green.generate(phoneNumber);

  if (generateResult) {
    if (generateResult.success) {
      let verifyGreenResult;
      do {
        const code = await readLine(
          "The code that has been sent to your phone number: "
        );
        verifyGreenResult = await masa.green.verify(phoneNumber, code);

        if (verifyGreenResult) {
          if (!verifyGreenResult.success) {
            console.error(
              `Verifying Green failed! '${verifyGreenResult.message}'`
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
        let mintGreenResult;
        do {
          console.log(`Minting Green on '${masa.config.network}'`);

          mintGreenResult = await masa.green.mint(
            paymentMethod,
            verifyGreenResult.authorityAddress,
            verifyGreenResult.signatureDate,
            verifyGreenResult.signature
          );

          if (mintGreenResult && mintGreenResult.tokenId) {
            console.log(
              `Green successfully minted on '${masa.config.network}' with token ID: '${mintGreenResult.tokenId}'`
            );
          }
        } while (!mintGreenResult?.tokenId);
      }
    } else {
      console.error(`Generating Green failed: '${generateResult.message}'`);
    }
  }
};
