import { describe } from "@jest/globals";
import eth_gasPrice from "./index";
import evaluateResponse from "../../../utils/evaluateResult";

describe("eth_gasPrice", () => {
  it("Returns the current price per gas in wei.", async () => {
    evaluateResponse(await eth_gasPrice());
  });
});
