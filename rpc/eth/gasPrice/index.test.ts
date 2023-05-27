import { describe } from "@jest/globals";
import eth_gasPrice from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_gasPrice", () => {
  it("Returns the current price per gas in wei.", async () => {
    evaluateResponse({
      response: await eth_gasPrice(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/fee_market.yaml",
        rpcName: "eth_gasPrice",
      }),
    });
  });
});
