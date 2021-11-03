/* eslint-disable prefer-const */
import { Address,BigInt } from "@graphprotocol/graph-ts"
import { SetToken  } from "../../generated/schema"

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    let contract = SetToken.bind(tokenAddress)
    let totalSupplyValue = null
    let totalSupplyResult = contract.try_totalSupply()
    if (!totalSupplyResult.reverted) {
      totalSupplyValue = totalSupplyResult
    }
    return BigInt.fromI32(totalSupplyValue)
  }

  export function fetchUnderlyingComponents(tokenAddress: Address): Address {
    let contract = SetToken.bind(tokenAddress)
    let tokenComponentsResult = contract.try_getComponents()
    return tokenComponentsResult
  }

  export function fetchManager(tokenAddress: Address): Address {
    let contract = SetToken.bind(tokenAddress)
    let tokenComponentsResult = contract.try_manager()
    return tokenComponentsResult
  }