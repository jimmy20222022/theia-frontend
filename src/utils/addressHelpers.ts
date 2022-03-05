import { ChainId } from '@pancakeswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMarketPlaceAddress = () => {
  return getAddress(addresses.marketPlace)
}
export const getUSDCAddress = () => {
  return getAddress(addresses.USDC)
}
export const getUSDGAddress = () => {
  return getAddress(addresses.USDG)
}
export const getPUSDGAddress = () => {
  return getAddress(addresses.PUSDG)
}
export const getSUSDGAddress = () => {
  return getAddress(addresses.SUSDG)
}

