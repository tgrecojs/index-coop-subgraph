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
  SetTokenIssued,
  SetTokenRedeemed,
  Issuer,
  SetToken,
  Manager,
  Fee,
  TokenIssuance,
} from '../../generated/schema';
import {SetToken as SetTokenContract} from '../../generated/SetToken/SetToken'

import { fetchManager, fetchTokenTotalSupply, fetchUnderlyingComponents } from '../utils/setToken';
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

const createFee = (id: string, timestamp: BigInt, managerPayout: BigInt, protocolPayout: BigInt): Fee => {
  let fee = new Fee(id)
  fee.timestamp = timestamp;
  fee.managerPayout = managerPayout;
  fee.protocolPayout = protocolPayout;
  return fee
}

const createManager = (id: string, address: Address, feeAccrualHistory: Fee[]): Manager => {
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
  let createIssuanceEntity = createIssuance(createGenericId(event),
    event.params._to,
    event.params._quantity
)
createIssuanceEntity.save()


let feeEntity = createFee(createGenericId(event),
  timestamp, event.params._managerFee,
  event.params._protocolFee
)
feeEntity.save()

let currentManager = Manager.load(fetchManager(setTokenAddress))

if (currentManager == null) {
  currentManager = createManager(fetchManager(setTokenAddress), setTokenAddress, [])
} 
let currentManagersFeeHistory = currentManager.feeAccrualHistory;

currentManager.save()

let issuerEntity = Issuer.load(id.toHexString())
if (issuerEntity == null) {
  issuerEntity = createIssuer(event.params._issuer)
}

let issuersTokensIssued = issuerEntity.setTokensIssued
issuersTokensIssued.push(createIssuanceEntity.id)
issuerEntity.setTokensIssued = issuersTokensIssued
issuerEntity.save()

let setTokenEntity: SetToken;
if (!SetToken.load(setTokenAddress.toHexString())) {
  setTokenEntity = new SetToken(setTokenAddress.toHexString())
  setTokenEntity.address = setTokenAddress
  setTokenEntity.name = `SetToken::${setTokenAddress.toHexString()}`
  setTokenEntity.manager = currentManager.id
  setTokenEntity.issuer = issuerEntity.id
  setTokenEntity.issuances = []
  setTokenEntity.totalSupply = BigInt.fromI32(0);
  setTokenEntity.save()
}





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
