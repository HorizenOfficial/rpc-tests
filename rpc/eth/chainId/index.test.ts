import { describe } from "@jest/globals";
import eth_chainId from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_chainId", () => {
  it("Returns the chain ID of the current network.", async () => {
    evaluateResponse({
      response: await eth_chainId(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/client.yaml",
        rpcName: "eth_chainId",
      }),
    });
  });
});
