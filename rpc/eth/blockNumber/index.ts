import fetchAPI from "../../../utils/fetchAPI";

async function blockNumber() : Promise<any> {
  const data = await fetchAPI({
    httpMethod: "post",
    options: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_blockNumber",
    },
  });

  return data;
}

export default blockNumber;
