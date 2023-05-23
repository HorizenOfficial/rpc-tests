import { describe } from "@jest/globals";
import eth_getUncleByBlockNumberAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getUncleByBlockNumberAndIndex", () => {
  it("Returns the uncle by block number and index.", async () => {
    evaluateResponse(await eth_getUncleByBlockNumberAndIndex());
  });
});
