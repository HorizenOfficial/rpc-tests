import { describe } from "@jest/globals";
import eth_blockNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_blockNumber", () => {
  it("Returns the number of most recent block.", async () => {
    evaluateResponse(await eth_blockNumber());
  });
});
