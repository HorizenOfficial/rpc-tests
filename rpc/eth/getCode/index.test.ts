import { describe } from "@jest/globals";
import eth_getCode from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getCode", () => {
  it("Returns code at a given address.", async () => {
    evaluateResponse(await eth_getCode());
  });
});
