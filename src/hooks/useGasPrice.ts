import {CHAIN_ID} from "../config/constants/networks";
import {ChainId} from "@pancakeswap/sdk";
import {GAS_PRICE, GAS_PRICE_GWEI} from "../config/constants/gas";

export function useGasPrice(): string {
    const chainId = CHAIN_ID
    return chainId === ChainId.MAINNET.toString() ? GAS_PRICE.default
        : GAS_PRICE_GWEI.testnet
}