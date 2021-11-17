import {
  FeeRecipientUpdated as FeeRecipientUpdatedEvent,
  IssueCall,
  IssueFeeUpdated as IssueFeeUpdatedEvent,
  RedeemFeeUpdated as RedeemFeeUpdatedEvent,
  SetTokenIssued as SetTokenIssuedEvent,
  SetTokenRedeemed as SetTokenRedeemedEvent,
} from '../../generated/DebtIssuanceModule/DebtIssuanceModule';
import {
  FeeRecipientUpdated,
  IssueFeeUpdated,
  RedeemFeeUpdated,
  Issuer,
  SetToken,
  SetTokenRedeemed,
  Manager,
  Fee,
  TokenIssuance,
  Transaction,
} from '../../generated/schema';
import { SetToken as SetTokenContract } from '../../generated/SetToken/SetToken'

import { bindTokenAddress, fetchManager, fetchTokenTotalSupply, fetchUnderlyingComponents } from '../utils/setToken';
import { Address, BigInt, ByteArray, Bytes, Entity, ethereum, log } from '@graphprotocol/graph-ts';

export function handleFeeRecipientUpdated(
  event: FeeRecipientUpdatedEvent
): void {
  let entity = new FeeRecipientUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._newFeeRecipient = event.params._newFeeRecipient;
  entity.save();
}

export function handleIssueFeeUpdated(event: IssueFeeUpdatedEvent): void {
  let entity = new IssueFeeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._newIssueFee = event.params._newIssueFee;
  entity.save();
}

export function handleRedeemFeeUpdated(event: RedeemFeeUpdatedEvent): void {
  let entity = new RedeemFeeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._newRedeemFee = event.params._newRedeemFee;
  entity.save();
}

export const createFee = (id: string, timestamp: BigInt, managerPayout: BigInt, protocolPayout: BigInt): Fee => {
  let fee = new Fee(id)
  fee.timestamp = timestamp;
  fee.managerPayout = managerPayout;
  fee.protocolPayout = protocolPayout;
  return fee
}

export const createManager = (id: string, address: Address): Manager => {
  let manager = new Manager(id)
  manager.address = address;
  manager.feeAccrualHistory = []
  manager.totalFees = BigInt.fromI32(0)
  return manager
}

const updateManager = (id: string, address: Address,
  fee: Fee): Manager => {
  let manager = Manager.load(id)
  return manager as Manager
}

const createIssuance = (id: string, buyerAddress: Bytes, quantity: BigInt): TokenIssuance => {
  let issuanceEntity = new TokenIssuance(id)
  issuanceEntity.buyerAddress = buyerAddress;
  issuanceEntity.quantity = quantity
  return issuanceEntity
}
const createGenericId = (event: ethereum.Event): string =>
  '' + event.transaction.hash.toHex() + '-' + event.logIndex.toString() + '';

/**
 * We should pull out all "create" functions and place them elsewhere
 * This should also entail each function being assessed for the data it is creating so that:
 * 1. the properties being save adhere to the desired index coop graph specificiation
 * 2. a. the codebase follows the D.R.Y. principle of programming. Each function is self-sufficient in regards to saving data. 
 *    b. from there, entities should be shared via the entity.id relationship, as opposed to duplicating logic throughout codebase
 */

// Update this to include additional info
const createTxn = (id: string, timestamp: BigInt): Transaction => {
  let txnObject = new Transaction(id)
  txnObject.timestamp = timestamp;
  return txnObject
}

const createIssuer = (address: Address): Issuer => {
  let newIssuer = new Issuer(address.toHexString())
  newIssuer.address = address;
  newIssuer.setTokensIssued = []
  return newIssuer
}
export function handleSetTokenIssued(event: SetTokenIssuedEvent): void {
  let id = event.params._issuer
  let setTokenAddress = event.params._setToken
  let timestamp = event.block.timestamp;
  let eventTxnData = event.transaction;

  const txn = createTxn(createGenericId(event), timestamp)

  txn.gasLimit = eventTxnData.gasLimit;
  txn.gasPriceInGwei = eventTxnData.gasPrice;

  txn.save()

  log.debug('txnData:: saved', [txn.id])
  let feeEntity = createFee(createGenericId(event),
    timestamp, event.params._managerFee,
    event.params._protocolFee
  )

  let issuanceEntity =
    createIssuance(createGenericId(event), event.params._to, event.params._quantity)
  issuanceEntity.transaction = txn.id;

  issuanceEntity.save();



  let currentManager = Manager.load(fetchManager(setTokenAddress))

  if (currentManager == null) {
    currentManager = createManager(fetchManager(setTokenAddress), setTokenAddress)
  }
  // A. managerFees is equal to current feeAccrualHistory array
  let managerFees = currentManager.feeAccrualHistory;
  // B. Use managerFees variable to update manager's feeAccrualHistoryArray to include the latest Fee.id
  managerFees.push(feeEntity.id)
  // C. Set updated feeAccrualHistory onto our Manager entity by setting currentManager.feeAccrualHistory = managerFees
  currentManager.feeAccrualHistory = managerFees;
  // D. currentManager.feeAccrualHistory is now set to the managerFees array (and therefore includes the latest Fee.id)
  currentManager.save()

  log.debug('currentManager:: saved', [currentManager.id])

  feeEntity.manager = currentManager.id;
  feeEntity.save()

  let issuerEntity = Issuer.load(id.toHexString())
  if (issuerEntity == null) {
    issuerEntity = createIssuer(event.params._issuer)
  }

  let issuersTokensIssued = issuerEntity.setTokensIssued
  issuersTokensIssued.push(issuanceEntity.id)
  issuerEntity.setTokensIssued = issuersTokensIssued
  issuerEntity.save()
  log.debug('issuerEntity saved::', [issuerEntity.id])


  let setTokenEntity = SetToken.load(setTokenAddress.toHexString())
  if (setTokenEntity == null) {
    setTokenEntity = new SetToken(setTokenAddress.toHexString())
    setTokenEntity.address = setTokenAddress
    setTokenEntity.name = bindTokenAddress(setTokenAddress).name()
    setTokenEntity.manager = currentManager.id
    setTokenEntity.issuer = issuerEntity.id
    setTokenEntity.issuances = []
    setTokenEntity.totalSupply = BigInt.fromI32(0);
  }



  let existingIssuances = setTokenEntity.issuances;

  existingIssuances.push(issuanceEntity.id);

  setTokenEntity.issuances = existingIssuances;
  setTokenEntity.save()
  log.debug('setTokenEntity saved::', [setTokenEntity.name])

}

export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
  let entity = new SetTokenRedeemed(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._redeemer = event.params._redeemer;
  entity._to = event.params._to;
  entity._quantity = event.params._quantity;
  entity._managerFee = event.params._managerFee;
  entity._protocolFee = event.params._protocolFee;
  entity.save();
}
