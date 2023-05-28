import { describe } from "@jest/globals";
import eth_getUncleCountByBlockNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getUncleCountByBlockNumber", () => {
  it("Returns the number of transactions in a block matching the given block number.", async () => {
    evaluateResponse({
      response: await eth_getUncleCountByBlockNumber(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/block.yaml",
        rpcName: "eth_getUncleCountByBlockNumber",
      }),
    });
  });
});
