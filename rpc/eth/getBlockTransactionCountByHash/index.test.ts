import { describe } from "@jest/globals";
import eth_getBlockTransactionCountByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getBlockTransactionCountByHash", () => {
  it("Returns the number of transactions in a block from a block matching the given block hash.", async () => {
    evaluateResponse({
      response: await eth_getBlockTransactionCountByHash(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/block.yaml",
        rpcName: "eth_getBlockTransactionCountByHash",
      }),
    });
  });
});
