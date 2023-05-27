import { describe } from "@jest/globals";
import eth_getBlockByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getBlockByNumber", () => {
  it("Returns information about a block by number.", async () => {
    evaluateResponse({
      response: await eth_getBlockByNumber(), 
      pattern: await patternGenerator.buildMainPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/block.yaml",
        rpcName: "eth_getBlockByNumber",
      }),
    });
  });
});
