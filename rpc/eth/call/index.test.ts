import { describe } from "@jest/globals";
import eth_call from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_call", () => {
  it("Executes a new message call immediately without creating a transaction on the block chain.", async () => {
    evaluateResponse(await eth_call());
  });
});
