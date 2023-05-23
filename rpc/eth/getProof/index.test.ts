import { describe } from "@jest/globals";
import eth_getProof from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getProof", () => {
  it("Returns the merkle proof for a given account and optionally some storage keys.", async () => {
    evaluateResponse(await eth_getProof());
  });
});
