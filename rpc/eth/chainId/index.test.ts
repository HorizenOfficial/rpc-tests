import { describe } from "@jest/globals";
import eth_chainId from "./index";
import evaluateResponse from "../../../utils/evaluateResult";

describe("eth_chainId", () => {
  it("Returns the chain ID of the current network.", async () => {
    evaluateResponse(await eth_chainId());
  });
});
