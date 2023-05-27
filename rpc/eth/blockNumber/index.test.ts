import { describe } from "@jest/globals";
import eth_blockNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_blockNumber", () => {
  it("Returns the number of most recent block.", async () => {
    evaluateResponse({
      response: await eth_blockNumber(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/client.yaml",
        rpcName: "eth_blockNumber",
      }),
    });
  });
});
