import { describe } from "@jest/globals";
import eth_getBlockByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getBlockByHash", () => {
  it("Returns information about a block by hash.", async () => {
    evaluateResponse({
      response: await eth_getBlockByHash(), 
      pattern: await patternGenerator.buildMainPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/block.yaml",
        rpcName: "eth_getBlockByHash",
      }),
    });
  });
});
