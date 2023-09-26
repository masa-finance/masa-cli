import { masa } from "../../../helpers";
import { createReadStream } from "fs";
import csv from "csv-parser";

export const mintASBT = async (contractAddress: string, receiver: string) => {
  const { mint, bulkMint } = await masa.asbt.connect(contractAddress);

  if (receiver.indexOf(",") > -1) {
    const addresses = receiver.split(",");

    await bulkMint(addresses);
  } else {
    await mint(receiver);
  }
};

export const mintFromSoulname = async (
  contractAddress: string,
  soulname: string,
) => {
  const address = await masa.soulName.resolve(soulname);

  if (address) {
    await mintASBT(contractAddress, address);
  }
};

export const bulkMintASBT = (contractAddress: string, csvFile: string) => {
  const receivers: string[] = [];

  // Load all receivers from the CSV file
  createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      receivers.push(row["Wallet Address"]); // Adjust this as per your csv file structure
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");

      const { bulkMint } = await masa.asbt.connect(contractAddress);

      if (bulkMint) {
        // Mint for each receiver one at a time
        try {
          await bulkMint(receivers);
          console.log(`Minted ASBT for receivers ${receivers}`);
        } catch (error) {
          console.log(`mint failed for: ${receivers}`, { error });
        }
      }
    });
};
