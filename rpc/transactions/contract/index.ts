import Web3 from "web3";
import Factory from "../../../node_modules/@uniswap/v2-core/build/UniswapV2Factory.json";
import Router from "../../../node_modules/@uniswap/v2-periphery/build/UniswapV2Router02.json";
import ERC20 from "../../../node_modules/@openzeppelin/contracts/build/contracts/ERC20PresetFixedSupply.json";
import WETH from "../../../node_modules/canonical-weth/build/contracts/WETH9.json";
import { Contract } from "web3-eth-contract"
import { getCurrentDateTokens } from "../../../utils/web3utils";
import {rootCertificates} from "tls";

export const deployWeth: (web3: Web3, sender: string) => Promise<string | undefined> = async (web3, sender) => {
    const wethContract = new web3.eth.Contract(WETH.abi as any);

    const nonce = await web3.eth.getTransactionCount(sender, 'pending');
    const gasPrice = await web3.eth.getGasPrice();

    console.log("WETH Contract Deploy: Estimating gas...");
    const estimatedGas = await wethContract
        .deploy({ data: WETH.bytecode })
        .estimateGas({ from: sender });
    console.log(`WETH Contract Deploy: Estimated Gas ${estimatedGas}`);

    try {
        // @ts-ignore
        const deployedWeth = await wethContract
            .deploy({ data: WETH.bytecode })
            .send({ from: sender, gas: estimatedGas, gasPrice: gasPrice, nonce: nonce });

        console.log("WETH deployed at:", deployedWeth.options.address);

        return deployedWeth.options.address;
    } catch (error) {
        console.error("Failed to deploy WETH:", error);
        throw error;
    }
};


export const deployTokenContracts: (web3: Web3, sender: string) =>
    Promise<[string, string] | undefined> = async (web3, sender) => {
    try {
        let tokenA = new web3.eth.Contract(ERC20.abi);
        let tokenB = new web3.eth.Contract(ERC20.abi);

        const { fullName: fullNameA, shortName: shortNameA } = getCurrentDateTokens("tokenA", "TA");
        const { fullName: fullNameB, shortName: shortNameB } = getCurrentDateTokens("tokenB", "TB");

        const nonceA = await web3.eth.getTransactionCount(sender, 'pending');
        const gasPrice = await web3.eth.getGasPrice();

        console.log(`UniSwap TokenA Deploy: Estimating gas...`);
        // @ts-ignore
        const estimatedGasA = await tokenA.deploy({
            data: ERC20.bytecode,
            arguments: [ fullNameA, shortNameA, "9999999999999999999", sender ]
        }).estimateGas();
        console.log(`UniSwap TokenA Deploy: Estimated gas ${estimatedGasA}`);

        console.log(`UniSwap TokenA Deploy: Deploying...`);
        // @ts-ignore
        tokenA = await tokenA.deploy({
            data: ERC20.bytecode,
            arguments: [ fullNameA, shortNameA, "9999999999999999999", sender ]
        }).send({ from: sender, gas: estimatedGasA, nonce: nonceA, gasPrice: gasPrice });

        console.log("tokenA address: ", tokenA.options.address);

        const nonceB = await web3.eth.getTransactionCount(sender, 'pending');

        console.log(`UniSwap TokenB Deploy: Deploying...`);
        // @ts-ignore
        tokenB = await tokenB.deploy({
            data: ERC20.bytecode,
            arguments: [ fullNameB, shortNameB, "9999999999999999999", sender ]
        }).send({ from: sender, gas: estimatedGasA, nonce: nonceB, gasPrice: gasPrice });

        console.log("tokenB address: ", tokenB.options.address);

        return [tokenA.options.address, tokenB.options.address];
    } catch (error) {
        console.error("Failed to deploy token contracts:", error);
        throw error;
    }
};

export const deployRouter = async (web3: Web3, factoryAddress: string, wethAddress: string, sender: string): Promise<string | undefined> => {
    try {
        let router = new web3.eth.Contract(Router.abi);

        const nonce = await web3.eth.getTransactionCount(sender, 'pending');
        const gasPrice = await web3.eth.getGasPrice();

        // @ts-ignore
        const estimatedGas = await router
            .deploy({ data: Router.bytecode, arguments: [factoryAddress, wethAddress] })
            .estimateGas({ from: sender });

        // @ts-ignore
        router = await router
            .deploy({ data: Router.bytecode, arguments: [factoryAddress, wethAddress] })
            .send({ from: sender, gas: estimatedGas, nonce: nonce, gasPrice: gasPrice });

        console.log("Router address", router.options.address);

        return router.options.address;
    } catch (error) {
        console.error("Failed to deploy Router:", error);
        throw error;
    }
};


export const deployFactory = async (web3: Web3, sender: string): Promise<string | undefined> => {
    try {
        let factory = new web3.eth.Contract(Factory.abi);

        const nonce = await web3.eth.getTransactionCount(sender, 'pending');
        const gasPrice = await web3.eth.getGasPrice();

        console.log("UniSwap Factory Deploy: Estimating gas...");
        // @ts-ignore
        const estimatedGas = await factory
            .deploy({ data: Factory.bytecode, arguments: [sender] })
            .estimateGas({ from: sender });
        console.log(`UniSwap Factory Deploy: Estimated gas ${estimatedGas}`);

        console.log("UniSwap Factory Deploy: Deploying...");
        // @ts-ignore
        factory = await factory
            .deploy({ data: Factory.bytecode, arguments: [sender] })
            .send({ from: sender, gas: estimatedGas, nonce: nonce, gasPrice: gasPrice });

        console.log("UniSwap Factory address: ", factory.options.address);

        return factory.options.address;
    } catch (error) {
        console.error("Failed to deploy Factory:", error);
        throw error;
    }
};

export const approve = async (
    web3: Web3,
    tokenContract: Contract<any>,
    spender: string,
    amount: string,
    sender: string
): Promise<{ transactionHash?: string, receipt?: any }> => {
    let estimatedGas;

    try {
        // @ts-ignore
        estimatedGas = await tokenContract.methods
            .approve(spender, amount)
            .estimateGas({ from: sender });
    } catch (error) {
        console.error("Error estimating gas:", error);
        throw error;
    }

    const nonce = await web3.eth.getTransactionCount(sender);
    const gasPrice = await web3.eth.getGasPrice();

    // @ts-ignore
    const tx = {
        to: tokenContract.options.address,
        data: tokenContract.methods.approve(spender, amount).encodeABI(),
        gas: estimatedGas,
        gasPrice: web3.utils.toHex(gasPrice),
        nonce: web3.utils.toHex(nonce),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.SEND_FROM_PK);

    let transactionHash;
    let receipt;

    const transactionResultPromise = new Promise<{ transactionHash?: string, receipt?: any }>((resolve, reject) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction!)
            .on('transactionHash', function (hash) {
                transactionHash = hash.toString();
                console.log("approve transactionHash: " + transactionHash);
            })
            .on('receipt', function (rec) {
                receipt = rec;
                resolve({ transactionHash, receipt });
            })
            .on('error', reject);
    });

    try {
        return await transactionResultPromise;
    } catch (error) {
        console.error("Error sending 'approve'", error);
        throw error;
    }
}

export const addLiquidity = async (
    web3: Web3,
    routerContract: Contract<any>,
    tokenAAddress: string,
    tokenBAddress: string,
    amountADesired: string,
    amountBDesired: string,
    amountAMin: string,
    amountBMin: string,
    sender: string,
    deadline: string
): Promise<{ transactionHash?: string, receipt?: any }> => {
    let estimatedGas;

    try {
        // @ts-ignore
        estimatedGas = await routerContract.methods
            .addLiquidity(
                tokenAAddress,
                tokenBAddress,
                amountADesired,
                amountBDesired,
                amountAMin,
                amountBMin,
                sender,
                deadline
            )
            .estimateGas({ from: sender });
    } catch (error) {
        console.error("Error estimating gas:", error);
        throw error;
    }

    const nonce = await web3.eth.getTransactionCount(sender);
    const gasPrice = await web3.eth.getGasPrice();

    // @ts-ignore
    const tx = {
        to: routerContract.options.address,
        data: routerContract.methods.addLiquidity(
            tokenAAddress,
            tokenBAddress,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            sender,
            deadline
        ).encodeABI(),
        gas: estimatedGas,
        gasPrice: web3.utils.toHex(gasPrice),
        nonce: web3.utils.toHex(nonce),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.SEND_FROM_PK);

    let transactionHash;
    let receipt;

    const transactionResultPromise = new Promise<{ transactionHash?: string, receipt?: any }>((resolve, reject) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction!)
            .on('transactionHash', function (hash) {
                transactionHash = hash.toString();
                console.log("addLiquidity transactionHash: " + transactionHash);
            })
            .on('receipt', function (rec) {
                receipt = rec;
                resolve({ transactionHash, receipt });
            })
            .on('error', reject);
    });

    try {
        return await transactionResultPromise;
    } catch (error) {
        console.error("Error sending 'addLiquidity'", error);
        throw error;
    }
}

export const getTokenBalance = async (
    web3: Web3,
    tokenContractAddress: string,
    accountAddress: string
): Promise<string> => {
    try {
        const tokenContract = new web3.eth.Contract(ERC20.abi as any, tokenContractAddress);
        // @ts-ignore
        return await tokenContract.methods.balanceOf(accountAddress).call();
    } catch (error) {
        console.error(`Failed to get token balance for address ${accountAddress} on token contract ${tokenContractAddress}:`, error);
        throw error;
    }
};

