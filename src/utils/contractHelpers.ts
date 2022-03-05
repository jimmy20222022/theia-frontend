import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from 'utils/providers'
import marketPlaceAbi from 'config/abi/marketplace.json'

// Addresses
// ABI
import bep20Abi from 'config/abi/erc20.json'

// Types
import type {Erc20,} from 'config/abi/types'
import {
  getMarketPlaceAddress,
  getPUSDGAddress,
  getSUSDGAddress,
  getUSDCAddress,
  getUSDGAddress
} from "./addressHelpers";

const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new Contract(address, abi, signerOrProvider)
}
export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(bep20Abi, address, signer) as Erc20
}
export const getMarketPlaceContract = (signer?: Signer | Provider) => {
  return getContract(marketPlaceAbi, getMarketPlaceAddress(), signer) as any
}
export const getUSDCContract = (signer?: Signer | Provider) => {
  return getContract(bep20Abi, getUSDCAddress(), signer) as any
}
export const getUSDGContract = (signer?: Signer | Provider) => {
  return getContract(bep20Abi, getUSDGAddress(), signer) as any
}
export const getPUSDGContract = (signer?: Signer | Provider) => {
  return getContract(bep20Abi, getPUSDGAddress(), signer) as any
}
export const getSUSDGContract = (signer?: Signer | Provider) => {
  return getContract(bep20Abi, getSUSDGAddress(), signer) as any
}