import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getMarketPlaceContract,
  getUSDCContract,
  getUSDGContract,
  getPUSDGContract,
  getSUSDGContract,
} from 'utils/contractHelpers'

// Imports below migrated from Exchange useContract.ts

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useMarketPlaceContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMarketPlaceContract(library.getSigner()), [library])
}

export const useUSDCContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getUSDCContract(library.getSigner()), [library])
}

export const useUSDGContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getUSDGContract(library.getSigner()), [library])
}

export const usePUSDGContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getPUSDGContract(library.getSigner()), [library])
}

export const useSUSDGContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSUSDGContract(library.getSigner()), [library])
}
