import { masa } from "../../../helpers";

import { createReadStream } from "fs";
import csv from "csv-parser";

export const mintFromSoulname = async (
  contractAddress: string,
  soulname: string
) => {
  const address = await masa.soulName.resolve(soulname);

  if (address) {
    await mintASBT(contractAddress, address);
  }
};

export const bulkMintASBT = async (
  contractAddress: string,
  csvFile: string
) => {
  const receivers: string[] = [];

  // Load all receivers from the CSV file
  createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      receivers.push(row["Wallet Address"]); // Adjust this as per your csv file structure
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");

      const { mint } = await masa.asbt.connect(contractAddress);

      if (mint) {
        // Mint for each receiver one at a time
        for (const receiver of receivers) {
          if (receiver && receiver.length > 0) {
            try {
              await mint(receiver);
              console.log(
                `Minted ASBT for receiver ${receiver} ${receivers.indexOf(
                  receiver
                )}/${receivers.length}`
              );
            } catch (e) {
              console.log("mint failed for: " + receiver, { error: e });
            }
          }
        }
      }
    });
};

export const mintASBT = async (contractAddress: string, receiver: string) => {
  const { mint } = await masa.asbt.connect(contractAddress);

  if (mint) {
    await mint(receiver);
  }
};
