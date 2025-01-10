require("dotenv").config();
import Web3 from "web3";
import BN from "bn.js";
import { describe, expect } from "@jest/globals";
import { formatPrivateKey } from "../../../utils/web3utils";
import sendTransaction, {getReceipt} from "./index";

const { RPC_URL, SEND_FROM_PK2, SEND_TO_ADDRESS, SEND_AMOUNT } = process.env;

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

// TODO: Commented out while testing Horizen 2, future nonce seems to be an issue?
// describe("eth_sendRawTransaction", () => {
//
//     if (!SEND_FROM_PK2) {
//         throw new Error("SEND_FROM_PK2 is missing from the environment variables. Please set it in the .env file.");
//     }
//
//     it("Sends a future nonce transaction, checks the mempool and then sends the correct nonce from EOA to EOA " +
//         "and confirms sender and receiver balance changes for both transactions.", async () => {
//
//         const account = web3.eth.accounts.privateKeyToAccount(formatPrivateKey(web3, SEND_FROM_PK2));
//
//         // Get the initial balances of both addresses BEFORE the transaction
//         const initialSenderBalance = await web3.eth.getBalance(account.address);
//         const initialReceiverBalance = await web3.eth.getBalance(SEND_TO_ADDRESS);
//
//         // Send the transaction with a future nonce
//         const { txHash: futureTxHash } = await sendTransaction(
//             web3,
//             SEND_FROM_PK2,
//             SEND_TO_ADDRESS,
//             SEND_AMOUNT,
//             1
//         );
//
//         expect(futureTxHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
//
//         // Fetch future transaction from the mempool using its tx hash
//         const MAX_RETRIES = 10;
//         let transaction;
//
//         for (let i = 0; i < MAX_RETRIES; i++) {
//             try {
//                 transaction = await web3.eth.getTransaction(futureTxHash);
//                 if (transaction) {
//                     break;
//                 }
//             } catch (e) {
//                 if (i === MAX_RETRIES - 1) {
//                     throw new Error("Unable to retrieve mempool transaction after " + MAX_RETRIES + " attempts: " + e);
//                 }
//             }
//             await new Promise(resolve => setTimeout(resolve, 1000));
//         }
//
//         expect(transaction.hash).toBe(futureTxHash);
//
//         const { txHash, receipt } = await sendTransaction(
//             web3,
//             SEND_FROM_PK2,
//             SEND_TO_ADDRESS,
//             SEND_AMOUNT
//         );
//
//         // Validate initial tx hash format and compare to tx receipt tx hash.
//         expect(txHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
//         expect(receipt.transactionHash).toBe(txHash);
//
//         const futureReceipt = await getReceipt(web3, futureTxHash);
//         expect(futureReceipt.transactionHash).toBe(futureTxHash);
//
//         // Get the transaction to fetch the gas price used
//         const sentTransaction = await web3.eth.getTransaction(txHash);
//
//         // Use the gas price from the fetched transaction
//         const gasPriceForTx = new BN(sentTransaction.gasPrice);
//         const gasCostForTx = new BN(receipt.gasUsed).mul(gasPriceForTx);
//
//         const futureTransaction = await web3.eth.getTransaction(futureTxHash);
//         const gasPriceForFutureTx = new BN(futureTransaction.gasPrice);
//         const gasCostForFutureTx = new BN(futureReceipt.gasUsed).mul(gasPriceForFutureTx);
//
//         // Calculate total costs for both transactions
//         const totalSentAmountForTx = new BN(web3.utils.toWei(SEND_AMOUNT, 'ether')).add(gasCostForTx);
//         const totalSentAmountForFutureTx = new BN(web3.utils.toWei(SEND_AMOUNT, 'ether')).add(gasCostForFutureTx);
//         const totalTransactionCost = totalSentAmountForTx.add(totalSentAmountForFutureTx);
//
//         // Get the balances of both addresses again AFTER the transaction
//         const newSenderBalance = await web3.eth.getBalance(account.address);
//         const newReceiverBalance = await web3.eth.getBalance(SEND_TO_ADDRESS);
//
//         // Confirm the transaction costs are correctly deducted from the sender balance
//         const senderBalanceDifference = new BN(initialSenderBalance).sub(new BN(newSenderBalance));
//         expect(senderBalanceDifference.toString()).toBe(totalTransactionCost.toString());
//
//         // Confirm the difference in the receiver's balance
//         const totalReceivedAmountInWei = (new BN(web3.utils.toWei(SEND_AMOUNT, 'ether'))).mul(new BN('2'));
//         expect(new BN(newReceiverBalance).sub(new BN(initialReceiverBalance)).toString()).toBe(totalReceivedAmountInWei.toString());
//     }, 120000);

describe("eth_sendRawTransaction - without future nonce transaction", () => {
    if (!SEND_FROM_PK2) {
        throw new Error("SEND_FROM_PK2 is missing from the environment variables. Please set it in the .env file.");
    }

    it("Sends a transaction from EOA to EOA and verifies its success", async () => {
        const account = web3.eth.accounts.privateKeyToAccount(formatPrivateKey(web3, SEND_FROM_PK2));

        const initialSenderBalance = await web3.eth.getBalance(account.address);
        const initialReceiverBalance = await web3.eth.getBalance(SEND_TO_ADDRESS);

        const { txHash, receipt } = await sendTransaction(
            web3,
            SEND_FROM_PK2,
            SEND_TO_ADDRESS,
            SEND_AMOUNT
        );

        expect(txHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
        expect(receipt.transactionHash).toBe(txHash);
        expect(Boolean(receipt.status)).toBe(true);

        const sentTransaction = await web3.eth.getTransaction(txHash);
        const gasPrice = new BN(sentTransaction.gasPrice);
        const gasCost = new BN(receipt.gasUsed).mul(gasPrice);

        const totalSentAmount = new BN(web3.utils.toWei(SEND_AMOUNT, "ether")).add(gasCost);

        const newSenderBalance = await web3.eth.getBalance(account.address);
        const newReceiverBalance = await web3.eth.getBalance(SEND_TO_ADDRESS);

        const senderBalanceDifference = new BN(initialSenderBalance).sub(new BN(newSenderBalance));
        expect(senderBalanceDifference.toString()).toBe(totalSentAmount.toString());

        const receiverBalanceDifference = new BN(newReceiverBalance).sub(new BN(initialReceiverBalance));
        expect(receiverBalanceDifference.toString()).toBe(web3.utils.toWei(SEND_AMOUNT, "ether"));
    }, 120000);
});
