import { describe } from "@jest/globals";
import eth_getBlockByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getBlockByHash", () => {
  it("Returns information about a block by hash.", async () => {
    evaluateResponse(await eth_getBlockByHash());
  });
});
