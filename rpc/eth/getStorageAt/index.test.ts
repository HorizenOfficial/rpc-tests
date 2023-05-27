import { describe } from "@jest/globals";
import eth_getStorageAt from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getStorageAt", () => {
  it("Returns the value from a storage position at a given address.", async () => {
    evaluateResponse({
      response: await eth_getStorageAt(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getStorageAt",
      }),
    });
  });
});
