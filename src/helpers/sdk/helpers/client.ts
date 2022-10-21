import axios from "axios";
import { config } from "../../../utils/config";

const headers = {
  "Content-Type": "application/json",
};

const middlewareClient = axios.create({
  baseURL: config.get("api-url") as string,
  withCredentials: true,
  headers,
});

export const sessionCheck = async (): Promise<any | undefined> => {
  const checkResponse = await middlewareClient
    .get(`/session/check`, {
      headers: {
        cookie: [config.get("cookie") as string],
      },
    })
    .catch();

  if (checkResponse) {
    const { data: checkData } = checkResponse;

    return checkData;
  }
};

export const getMetadata = async (uri: string) => {
  const metadataResponse = await middlewareClient.get(uri, {
    headers: {
      cookie: [config.get("cookie") as string],
    },
  });

  if (metadataResponse) {
    const { data: metadata } = metadataResponse;
    return metadata;
  }
};

export const metadataStore = async (
  soulName: string
): Promise<any | undefined> => {
  const storeMetadataResponse = await middlewareClient
    .post(
      `/storage/store`,
      {
        soulName: `${soulName}.soul`,
      },
      {
        headers: {
          cookie: [config.get("cookie") as string],
        },
      }
    )
    .catch((err: any) => {
      console.error(err.message);
    });

  if (storeMetadataResponse) {
    const { data: storeMetadataData } = storeMetadataResponse;
    return storeMetadataData;
  }
};

export const getChallenge = async (): Promise<any | undefined> => {
  const getChallengeResponse = await middlewareClient
    .get(`/session/get-challenge`)
    .catch((err: any) => {
      console.error(err.message);
    });

  if (getChallengeResponse) {
    const cookies = getChallengeResponse.headers["set-cookie"];

    let cookie;
    if (cookies) cookie = cookies[0];

    const { data: challengeData } = getChallengeResponse;

    return {
      ...challengeData,
      cookie,
    };
  }
};

export const checkSignature = async (
  address: string,
  signature: string
): Promise<any | undefined> => {
  const checkSignatureResponse = await middlewareClient
    .post(
      `/session/check-signature`,
      {
        address,
        signature,
      },
      {
        headers: {
          cookie: [config.get("cookie") as string],
        },
      }
    )
    .catch((err: any) => {
      console.error(err.message);
    });

  if (checkSignatureResponse) {
    const { data: checkSignatureData } = checkSignatureResponse;

    return checkSignatureData;
  }
};

export const creditScoreMint = async (address: string, signature: string) => {
  const storeMetadataResponse = await middlewareClient
    .post(
      `/contracts/credit-score/mint`,
      {
        address,
        signature,
      },
      {
        headers: {
          cookie: [config.get("cookie") as string],
        },
      }
    )
    .catch((err: any) => {
      console.error(err.message);
    });

  if (storeMetadataResponse) {
    const {
      data: { success, message },
    } = storeMetadataResponse;

    return {
      success,
      message,
    };
  }
};

export const sessionLogout = async () => {
  const logoutResponse = await middlewareClient
    .post(`/session/logout`, undefined, {
      headers: {
        cookie: [config.get("cookie") as string],
      },
    })
    .catch((err: any) => {
      console.error(err.message);
    });

  if (logoutResponse) {
    const { data: logoutData } = logoutResponse;
    return logoutData;
  }
};
