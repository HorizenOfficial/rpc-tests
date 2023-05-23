import { describe } from "@jest/globals";
import eth_getUncleByBlockHashAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getUncleByBlockHashAndIndex", () => {
  it("Returns the uncle by block hash and index.", async () => {
    evaluateResponse(await eth_getUncleByBlockHashAndIndex());
  });
});
