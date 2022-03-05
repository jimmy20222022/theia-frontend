import React, { useEffect, useState } from 'react'
import { CardBody, Flex, Text } from '@theia-my/uikit'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  useMarketPlaceContract,
  usePUSDGContract,
  useSUSDGContract,
  useUSDCContract,
  useUSDGContract,
} from '../../hooks/useContract'
import { useTranslation } from '../../contexts/Localization'
import useToast from '../../hooks/useToast'
import { ToastDescriptionWithTx } from '../../components/Toast'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useCall } from '../../hooks/useCall'

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  :disabled {
    background: grey;
  }
`

const User: React.FC<any> = () => {
  // Libraries
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()

  // States: Approved
  const [approvedUSDCUpdated, setApprovedUSDCUpdated] = useState(false)

  // States: Button
  const [refreshButtonUpdated, setRefreshButtonUpdated] = useState(false)
  const [approvedButtonUpdated, setApprovedButtonUpdated] = useState(false)
  const [swapUSDCForUSDGUpdated, setSwapUSDCForUSDGUpdated] = useState(false)
  const [swapPUSDGForUSDGUpdated, setSwapPUSDGForUSDGUpdated] = useState(false)
  const [swapUSDCForPUSDGUpdated, setSwapUSDCForPUSDGUpdated] = useState(false)
  const [swapPUSDGForUSDCUpdated, setSwapPUSDGForUSDCUpdated] = useState(false)

  // States: Qty
  const [USDCBalance, setUSDCBalance] = useState('0')
  const [USDGBalance, setUSDGBalance] = useState('0')
  const [PUSDGBalance, setPUSDGBalance] = useState('0')
  const [SUSDGBalance, setSUSDGBalance] = useState('0')

  // States: input
  const [USDCQty, setUSDCQty] = useState('0.0')
  const [PUSDGQty, setPUSDGQty] = useState('0.0')

  // States: input conversion
  const [USDCQtyInBase, setUSDCQtyInBase] = useState('0')
  const [PUSDGQtyInBase, setPUSDGQtyInBase] = useState('0')

  // Other variables
  const marketPlaceContract = useMarketPlaceContract()
  const USDCContract = useUSDCContract()
  const USDGContract = useUSDGContract()
  const pUSDGContract = usePUSDGContract()
  const sUSDGContract = useSUSDGContract()

  const { call } = useCall()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { account } = useWeb3React()

  const sixZero = 1_000_000

  useEffect(() => {
    setApprovedUSDCUpdated(false)
  }, [account])

  const getAllowance = async () => {
    if (!account) {
      return false
    }

    const allowanceCall = await call(USDCContract, 'allowance', [account, marketPlaceContract.address])

    if (new BigNumber(allowanceCall.toString()).gt(new BigNumber(1_000_000_000))) {
      return true
    }

    return false
  }

  const getBalance = async () => {
    setRefreshButtonUpdated(true)

    const USDCBal = await call(USDCContract, 'balanceOf', [account])
    setUSDCBalance(new BigNumber(USDCBal.toString()).dividedBy(sixZero).toString())

    const USDGBal = await call(USDGContract, 'balanceOf', [account])
    setUSDGBalance(new BigNumber(USDGBal.toString()).dividedBy(sixZero).toString())

    const pUSDGBal = await call(pUSDGContract, 'balanceOf', [account])
    setPUSDGBalance(new BigNumber(pUSDGBal.toString()).dividedBy(sixZero).toString())

    const sUSDGBal = await call(sUSDGContract, 'balanceOf', [account])
    setSUSDGBalance(new BigNumber(sUSDGBal.toString()).dividedBy(sixZero).toString())

    setRefreshButtonUpdated(false)
  }

  // Approve
  const handleApprove = async () => {
    setApprovedButtonUpdated(true)
    try {
      const tx = await callWithGasPrice(USDCContract, 'approve', [marketPlaceContract.address, MaxUint256])
      toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(t('Approved'))
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    } catch (err: any) {
      const errMessage = err?.data?.message
      if (errMessage) {
        toastError(t('Error'), err?.data?.message)
      }
    } finally {
      setApprovedButtonUpdated(false)
      setApprovedUSDCUpdated(false)
    }
  }

  const swapUSDCForUSDG = async () => {
    const hasAllowed = await getAllowance()

    if (!hasAllowed) {
      setApprovedUSDCUpdated(true)
      toastError(t('Error'), t('Please approve our smart contract to move you USDC balance!'))
      return
    }

    setSwapUSDCForUSDGUpdated(true)
    try {
      const tx = await callWithGasPrice(marketPlaceContract, 'swapUSDCForUSDG', [USDCQtyInBase])
      toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(t('Swapped'))
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    } catch (err: any) {
      const errMessage = err?.data?.message
      if (errMessage) {
        toastError(t('Error'), err?.data?.message)
      }
    } finally {
      setSwapUSDCForUSDGUpdated(false)
      await getBalance()
    }
  }

  const swapPUSDGForUSDG = async () => {
    setSwapPUSDGForUSDGUpdated(true)
    try {
      const tx = await callWithGasPrice(marketPlaceContract, 'swapPUSDGForUSDG', [PUSDGQtyInBase])
      toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(t('Swapped'))
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    } catch (err: any) {
      const errMessage = err?.data?.message
      if (errMessage) {
        toastError(t('Error'), err?.data?.message)
      }
    } finally {
      setSwapPUSDGForUSDGUpdated(false)
      await getBalance()
    }
  }

  const swapUSDCForPUSDG = async () => {
    setSwapUSDCForPUSDGUpdated(true)
    try {
      const tx = await callWithGasPrice(marketPlaceContract, 'swapUSDCForPUSDG', [USDCQtyInBase])
      toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(t('Swapped'))
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    } catch (err: any) {
      const errMessage = err?.data?.message
      if (errMessage) {
        toastError(t('Error'), err?.data?.message)
      }
    } finally {
      setSwapUSDCForPUSDGUpdated(false)
      await getBalance()
    }
  }

  const swapPUSDGForUSDC = async () => {
    setSwapPUSDGForUSDCUpdated(true)
    try {
      const tx = await callWithGasPrice(marketPlaceContract, 'swapPUSDGForUSDC', [PUSDGQtyInBase])
      toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(t('Swapped'))
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    } catch (err: any) {
      const errMessage = err?.data?.message
      if (errMessage) {
        toastError(t('Error'), err?.data?.message)
      }
    } finally {
      setSwapPUSDGForUSDCUpdated(false)
      await getBalance()
    }
  }

  // USDC Qty keyed-in
  const handleUSDCQtyChange = (input: string) => {
    const { formattedInput, formattedInputInBase } = getMeaningfulBN(input)
    setUSDCQty(formattedInput)
    setUSDCQtyInBase(formattedInputInBase)
  }

  // USDG Qty keyed-in
  const handlePUSDGQtyChange = (input: string) => {
    const { formattedInput, formattedInputInBase } = getMeaningfulBN(input)
    setPUSDGQty(formattedInput)
    setPUSDGQtyInBase(formattedInputInBase)
  }

  const getMeaningfulBN = (input: string) => {
    let formattedInput = '0.0'

    if (input !== '') {
      formattedInput = input
    }

    if (input.charAt(input.length - 1) === '.') {
      formattedInput += '0'
    }

    const formattedInputInBase = new BigNumber(formattedInput).multipliedBy(new BigNumber(sixZero)).toString()

    return { formattedInput, formattedInputInBase }
  }

  if (!account) {
    return (
        <>
          <Flex justifyContent="center">
            <Text color="textSubtle" fontSize="30px">
              Please connect wallet first.
            </Text>
          </Flex>
        </>
    )
  }

  return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Button disabled={refreshButtonUpdated} onClick={getBalance}>
                Refresh balance
              </Button>
              <CardBody>
                <div>USDC balance in wallet = {USDCBalance}</div>
                <div>USDG balance in wallet = {USDGBalance}</div>
                <div>PUSDG balance in wallet = {PUSDGBalance}</div>
                <div>SUSDG balance in wallet = {SUSDGBalance}</div>
              </CardBody>
              {approvedUSDCUpdated ? (
                  <Button disabled={approvedButtonUpdated} onClick={handleApprove}>
                    Approve USDC
                  </Button>
              ) : (
                  <></>
              )}
            </div>
            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm">
                  <Button disabled={swapUSDCForUSDGUpdated} onClick={swapUSDCForUSDG}>
                    Swap USDC For USDG
                  </Button>
                </div>
                <div className="col-sm">
                  <CurrencyInputPanel
                      value={USDCQty}
                      disableCurrencySelect
                      onUserInput={handleUSDCQtyChange}
                      id="swapUSDCForUSDG"
                      showMaxButton={false}
                      onCurrencySelect={() => null}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <Button disabled={swapPUSDGForUSDGUpdated} onClick={swapPUSDGForUSDG}>
                    Swap PUSDG For USDG
                  </Button>
                </div>
                <div className="col-sm">
                  <CurrencyInputPanel
                      value={PUSDGQty}
                      disableCurrencySelect
                      onUserInput={handlePUSDGQtyChange}
                      id="swapPUSDGForUSDG"
                      showMaxButton={false}
                      onCurrencySelect={() => null}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <Button disabled={swapUSDCForPUSDGUpdated} onClick={swapUSDCForPUSDG}>
                    Swap USDC For PUSDG
                  </Button>
                </div>
                <div className="col-sm">
                  <CurrencyInputPanel
                      value={USDCQty}
                      disableCurrencySelect
                      onUserInput={handleUSDCQtyChange}
                      id="swapUSDCForPUSDG"
                      showMaxButton={false}
                      onCurrencySelect={() => null}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <Button disabled={swapPUSDGForUSDCUpdated} onClick={swapPUSDGForUSDC}>
                    Swap PUSDG For USDC
                  </Button>
                </div>
                <div className="col-sm">
                  <CurrencyInputPanel
                      value={PUSDGQty}
                      disableCurrencySelect
                      onUserInput={handlePUSDGQtyChange}
                      id="swapPUSDGForUSDC"
                      showMaxButton={false}
                      onCurrencySelect={() => null}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3" />
          </div>
        </div>
      </>
  )
}

export default User
