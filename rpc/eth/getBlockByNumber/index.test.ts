import { describe, expect, } from "@jest/globals";
import getBlockByNumber from "./index";
import baseTypes from "../../../utils/baseTypes";

describe("eth_getBlockByNumber", () => {
  it("returns information about a block by number", async () => {
    const { jsonrpc, id, result } = await getBlockByNumber();
    
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    expect(result.parentHash).toMatch(baseTypes.hash32.pattern);
    expect(result.sha3Uncles).toMatch(baseTypes.bytes.pattern);
    expect(result.miner).toMatch(baseTypes.address.pattern);
    expect(result.stateRoot).toMatch(baseTypes.bytes32.pattern);
    expect(result.transactionsRoot).toMatch(baseTypes.bytes32.pattern);
    expect(result.logsBloom).toMatch(baseTypes.bytes256.pattern);
    expect(result.number).toMatch(baseTypes.uint.pattern);
    expect(result.gasLimit).toMatch(baseTypes.uint.pattern);
    expect(result.gasUsed).toMatch(baseTypes.uint.pattern);
    expect(result.timestamp).toMatch(baseTypes.uint.pattern);
    expect(result.extraData).toMatch(baseTypes.bytes.pattern);
    expect(result.mixHash).toMatch(baseTypes.bytes32.pattern);
    expect(result.nonce).toMatch(baseTypes.bytes8.pattern);
    expect(result.size).toMatch(baseTypes.uint.pattern);
    
    if (result.difficulty) {
      expect(result.difficulty).toMatch(baseTypes.bytes.pattern);
    }

    if (result.totalDifficulty) {
      expect(result.totalDifficulty).toMatch(baseTypes.uint.pattern);
    }

    if (result.baseFeePerGas) {
      expect(result.baseFeePerGas).toMatch(baseTypes.uint.pattern);
    }

    if (result.withdrawalsRoot) {
      expect(result.withdrawalsRoot).toMatch(baseTypes.bytes32.pattern);
    }

    if (result.transactions.length) {
      result.transactions.forEach(transaction => {
        expect(transaction.type).toMatch(baseTypes.byte.pattern);
        expect(transaction.nonce).toMatch(baseTypes.uint.pattern);
        expect(transaction.gas).toMatch(baseTypes.uint.pattern);
        expect(transaction.value).toMatch(baseTypes.uint.pattern);
        expect(transaction.input).toMatch(baseTypes.bytes.pattern);
        expect(transaction.chainId).toMatch(baseTypes.uint.pattern);
        expect(transaction.r).toMatch(baseTypes.uint.pattern);
        expect(transaction.s).toMatch(baseTypes.uint.pattern);
        
        if (transaction.to) {
          expect(transaction.to).toMatch(baseTypes.address.pattern);
        }

        if (transaction.maxPriorityFeePerGas) {
          expect(transaction.maxPriorityFeePerGas).toMatch(baseTypes.uint.pattern);
        }
        
        if (transaction.maxFeePerGas) {
          expect(transaction.maxFeePerGas).toMatch(baseTypes.uint.pattern);
        }

        if (transaction.yParity) {
          expect(transaction.yParity).toMatch(baseTypes.uint.pattern);
        }

        if (transaction.accessList) {
          // to do...
        }
      })
    }

    if (result.withdrawals) {
      // to do...
    }

    if (result.uncles) {
      // to do...
    }
  });
});
