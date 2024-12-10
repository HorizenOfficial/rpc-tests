import { describe } from "@jest/globals";
import eth_getTransactionByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";
import { getLatestTxHash} from "../../../utils/blockscoutApi";

describe("eth_getTransactionByHash", () => {

  it("Returns the information about a transaction requested by transaction hash.", async () => {
    evaluateResponse({
      response: await eth_getTransactionByHash(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/transaction.yaml",
        rpcName: "eth_getTransactionByHash",
        }),
      expectNullResult: false
    });
  });

  const blockscoutApi = process.env.BLOCKSCOUT_API;

  console.log("api: " + blockscoutApi);

  (blockscoutApi ? test : test.skip)(
      "Returns the information about the most recent transaction hash taken from blockscout",
      async () => {
        const txHash = await getLatestTxHash();

        evaluateResponse({
          response: await eth_getTransactionByHash(txHash),
          pattern: await patternGenerator.buildStringPattern({
            rpcDefinitionPath: "../execution-apis/src/eth/transaction.yaml",
            rpcName: "eth_getTransactionByHash",
          }),
          expectNullResult: false,
        });
      }
  );
});
