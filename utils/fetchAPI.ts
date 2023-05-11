import axios from "axios";
import urlProvider from "./urlProvider";
import { JSONRPC, Options, } from "./types";

async function fetchAPI({ 
  httpMethod = "post",
  options,
  url = urlProvider.rpcUrl,
}: {
  httpMethod?: string;
  options: Options;
  url?: string;
}): Promise<JSONRPC> {
  try {
    const response = await axios[httpMethod](
      url,
      { ...options, }
    );
    return response.data;
  } catch(error) {
    throw new Error(error);
  }
}

export default fetchAPI;
