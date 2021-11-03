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
  Component,
  Fee,
  TokenIssuance,
} from '../../generated/schema';

import {
  contracts,
  findByAddress,
} from '../../config';
import { fetchManager, fetchTokenTotalSupply, fetchUnderlyingComponents } from '../utils/setToken';
import { BigInt, Entity, ethereum } from '@graphprotocol/graph-ts';

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

const unwrap = (arr: []): object => {
  const value = [arr];
  return value
}

const defaultFee = {
  id: '',
  timestamp: null,
  managerPayout: new BigInt(0),
  protocolPayout: new BigInt(0)
  , Entity: Fee
}

const createFee = (obj: any = defaultFee): object => {
  const { id, timestamp, managerPayout, protocolPayout, Entity } = obj;
  let fee = new Entity(id)
  fee.timestamp = timestamp;
  fee.managerPayout = managerPayout;
  fee.protocolPayout = protocolPayout;
  return fee
}
const defaultManager = {
  id: '',
  address: null,
  feeAccrualHistory: [],
  tokensManaged: [],
  Entity: Manager
}


const createManager = (obj: any = defaultFee): Manager  => {
  const { id, address, feeAccrualHistory, Entity } = obj;
  let manager = new Entity(id)
  manager.address = address;
  manager.feeAccrualHistory = feeAccrualHistory;
  manager.tokensManaged = [];
  return manager
}

const defaultIssuance = {
  id: '',
  buyerAddress: null,
  quantity: new BigInt(0),
  Entity: TokenIssuance
}

const createIssuance = (obj: any = defaultIssuance): object => {
  const { id, buyerAddress, quantity, Entity } = obj
  let issuanceEntity = new Entity(id)
  issuanceEntity.buyerAddress = buyerAddress;
  issuanceEntity.quantity = quantity
  return issuanceEntity
}
const createGenericId = (event: ethereum.Event): String =>
  event.transaction.hash.toHex() + - + event.logIndex.toString();

export function handleSetTokenIssued(event: SetTokenIssuedEvent): void {
  let id = event.params._issuer
  let setTokenAddress = event.params._setToken
  let timestamp = event.block.timestamp;
  let setToken;
  let createIssuanceEntity = createIssuance({
    id: createGenericId(event),
    quantity: event.params._quantity,
    buyerAddress: event.params._to
  })

  let managerE: Manager;


  let createFeeEntity = createFee({
    id: createGenericId(event),
    timestamp, managerPayout: event.params._managerFee, protocolPayout: event.params._protocolFee
  })
  if (!Manager.load(fetchManager(setTokenAddress).toHexString())) {
    managerE = createManager({
      id: fetchManager(setTokenAddress).toHexString(),
      address: fetchManager(setTokenAddress),
      feeAccrualHistory: [createFeeEntity]
    })
  } else {
    managerE = Manager.load(fetchManager(setTokenAddress).toHexString())
    let currentManagerFees = managerE.feeAccrualHistory;

    currentManagerFees.push(createFeeEntity)
    managerE.feeAccrualHistory = currentManagerFees

  }



  if (!SetToken.load(setTokenAddress.toHexString())) {
    let setTokenEntity = new SetToken(setTokenAddress.toHexString())
    setTokenEntity.address = setTokenAddress

    const icTokenObj = contracts.filter(x => x.rootAddress === setTokenAddress.toHexString());
    setTokenEntity.name = icTokenObj[0].name;
    setTokenEntity.totalSupply = fetchTokenTotalSupply(setTokenAddress)
    setTokenEntity.manager = managerE;
    setToken = setTokenEntity;
  } else {
    let exisitingToken = SetToken.load(setTokenAddress.toHexString())
    exisitingToken.totalSupply = fetchTokenTotalSupply(setTokenAddress)
    setToken = exisitingToken;
  }

  let tokensManagedArray = managerE.tokensManaged
  tokensManagedArray.push(setToken)
  managerE.tokensManaged = tokensManagedArray



  let issuerE;

  if (!Issuer.load(id.toHexString())) {
    let issuerEntity = new Issuer(id.toHexString());
    issuerEntity.address = id
    issuerEntity.setTokensIssued = [setToken]
    issuerE = issuerEntity
  } else {
    let existingIssuer = Issuer.load(id.toHexString());
    let exisitingIssuances = existingIssuer.setTokensIssued;
    exisitingIssuances.push(setToken)
    existingIssuer.setTokensIssued = exisitingIssuances;
    issuerE = existingIssuer
  }

  issuerE.save()
  managerE.save()
  createFeeEntity.save()
  createIssuanceEntity.save();
  setToken.save()

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
