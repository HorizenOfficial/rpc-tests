import axios from "axios";
import { JSONRPC, Options, } from "./types";
require("dotenv").config();

async function fetchAPI({ 
  httpMethod = "post",
  options,
  url = process.env.RPC_URL,
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
