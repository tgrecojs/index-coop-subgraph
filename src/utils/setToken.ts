/* eslint-disable prefer-const */
import { Address,BigInt, ByteArray, Bytes, log } from "@graphprotocol/graph-ts"
import { SetToken } from "../../generated/SetToken/SetToken"


export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    let contract = SetToken.bind(tokenAddress)
    let totalSupplyResult = contract.try_totalSupply()

    return BigInt.fromI32(totalSupplyResult as i32)
  }

  export function fetchUnderlyingComponents(tokenAddress: Address): Address[] {
    let contract = SetToken.bind(tokenAddress)
    let result = [];
    let tokenComponentsResult = contract.try_getComponents()

    return result
  }

  export function fetchManager(tokenAddress: Address): string {
    let contract = SetToken.bind(tokenAddress)
    let result = contract.try_manager()
    return result.value.toString()
  }