/* eslint-disable prefer-const */
import { Address,BigInt, ByteArray, Bytes, log } from "@graphprotocol/graph-ts"
import { Manager } from "../../generated/schema"
import { SetToken } from "../../generated/SetToken/SetToken"

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    let contract = SetToken.bind(tokenAddress)
    let totalSupplyResult = contract.try_totalSupply()

    // [TG] no idea as to how i32 is doing here but assuming it allows typecasting from different int to a uint32
    // removing `as i32` from the code below breaks build
    return totalSupplyResult.value
  }

  export const bindTokenAddress = (address: Address): SetToken => SetToken.bind(address);

  export function fetchUnderlyingComponents(tokenAddress: Address): Address[] {
    let contract = SetToken.bind(tokenAddress)
    let tokenComponentsResult = contract.try_getComponents()
    // need to use the .value property to get the return value of ethereum CallResult that we get from try_<methodName>
    return tokenComponentsResult.value
  }

  export function fetchManager(tokenAddress: Address): string {
    let contract = SetToken.bind(tokenAddress)
    // msg below is shown in vscode. reading it we can infer the result t
    // intellisence: (method) SetToken.try_manager(): ethereum.CallResult<Address>
    let result = contract.try_manager()
    // convert from Address to string so it can be used within Manager.load(string)
    if(!result.reverted) {

    }
    return result.value.toHexString()
  }

  export function getIssuerAddress(tokenAddress: Address): string {
    let contract = SetToken.bind(tokenAddress)
    // msg below is shown in vscode. reading it we can infer the result t
    // intellisence: (method) SetToken.try_manager(): ethereum.CallResult<Address>
    let result = contract.try_controller()
    // convert from Address to string so it can be used within Manager.load(string)
    // toHexString() needed for UTF character reasons
    // TODO: !result.reverted ? result.value : fallback hex string
    return result.value.toHexString()
  }