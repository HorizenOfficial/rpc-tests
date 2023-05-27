import { describe } from "@jest/globals";
import eth_getBlockTransactionCountByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getBlockTransactionCountByNumber", () => {
  it("Returns the number of transactions in a block matching the given block number.", async () => {
    evaluateResponse({
      response: await eth_getBlockTransactionCountByNumber(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/block.yaml",
        rpcName: "eth_getBlockTransactionCountByNumber",
      }),
    });
  });
});
