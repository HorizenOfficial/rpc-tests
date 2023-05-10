import axios from "axios";
import urlProvider from "./urlProvider";

type Options = {
  [ key: string ]: string | number;
}

async function fetchAPI({ 
  httpMethod = "post",
  options,
}: {
  httpMethod: string;
  options: Options;
}): Promise<object> {
  try {
    const response = await axios[httpMethod](
      urlProvider.rpcUrl,
      { ...options, }
    );
    return response.data;
  } catch(error) {
    throw new Error(error);
  }
}

export default fetchAPI;
