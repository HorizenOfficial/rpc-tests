import { describe } from "@jest/globals";
import eth_getLogs from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getLogs", () => {
  it("Returns the balance of the account of given address.", async () => {
    const schema = patternGenerator.getSchema();
    evaluateResponse({
      response: await eth_getLogs(), 
      pattern: await patternGenerator.buildMainPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/filter.yaml",
        rpcName: "eth_getLogs",
        main: "#/components/schemas/Log",
      }),
    });
  });
});
