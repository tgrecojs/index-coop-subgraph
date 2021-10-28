import {
    FeeRecipientUpdated as FeeRecipientUpdatedEvent,
    IssueFeeUpdated as IssueFeeUpdatedEvent,
    RedeemFeeUpdated as RedeemFeeUpdatedEvent,
    SetTokenIssued as SetTokenIssuedEvent,
    SetTokenRedeemed as SetTokenRedeemedEvent
  } from "../../generated/DebtIssuanceModule/DebtIssuanceModule"
  import {
    FeeRecipientUpdated,
    IssueFeeUpdated,
    RedeemFeeUpdated,
    SetTokenIssued,
    SetTokenRedeemed
  } from "../../generated/schema"
  
  export function handleFeeRecipientUpdated(
    event: FeeRecipientUpdatedEvent
  ): void {
    let entity = new FeeRecipientUpdated(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity._setToken = event.params._setToken
    entity._newFeeRecipient = event.params._newFeeRecipient
    entity.save()
  }
  
  export function handleIssueFeeUpdated(event: IssueFeeUpdatedEvent): void {
    let entity = new IssueFeeUpdated(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity._setToken = event.params._setToken
    entity._newIssueFee = event.params._newIssueFee
    entity.save()
  }
  
  export function handleRedeemFeeUpdated(event: RedeemFeeUpdatedEvent): void {
    let entity = new RedeemFeeUpdated(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity._setToken = event.params._setToken
    entity._newRedeemFee = event.params._newRedeemFee
    entity.save()
  }
  
  export function handleSetTokenIssued(event: SetTokenIssuedEvent): void {
    let entity = new SetTokenIssued(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity._setToken = event.params._setToken
    entity._issuer = event.params._issuer
    entity._to = event.params._to
    entity._hookContract = event.params._hookContract
    entity._quantity = event.params._quantity
    entity._managerFee = event.params._managerFee
    entity._protocolFee = event.params._protocolFee
    entity.save()
  }
  
  export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
    let entity = new SetTokenRedeemed(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity._setToken = event.params._setToken
    entity._redeemer = event.params._redeemer
    entity._to = event.params._to
    entity._quantity = event.params._quantity
    entity._managerFee = event.params._managerFee
    entity._protocolFee = event.params._protocolFee
    entity.save()
  }
  