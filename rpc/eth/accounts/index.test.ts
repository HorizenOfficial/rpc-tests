import { describe } from "@jest/globals";
import eth_accounts from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_accounts", () => {
  it("Returns a list of addresses owned by client.", async () => {
    evaluateResponse({
      response: await eth_accounts(), 
      pattern: await patternGenerator.buildArrayPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/client.yaml",
        rpcName: "eth_accounts",
      }),
    });
  });
});
