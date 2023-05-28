import { describe } from "@jest/globals";
import eth_getUncleCountByBlockHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getUncleCountByBlockHash", () => {
  it("Returns the number of uncles in a block from a block matching the given block hash.", async () => {
    evaluateResponse({
      response: await eth_getUncleCountByBlockHash(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/block.yaml",
        rpcName: "eth_getUncleCountByBlockHash",
      }),
    });
  });
});
