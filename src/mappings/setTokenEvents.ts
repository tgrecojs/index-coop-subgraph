import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  AnyoneCallableUpdated as AnyoneCallableUpdatedEvent,
  CallerStatusUpdated as CallerStatusUpdatedEvent,
  Disengaged as DisengagedEvent,
  Engaged as EngagedEvent,
  ExecutionSettingsUpdated as ExecutionSettingsUpdatedEvent,
  IncentiveSettingsUpdated as IncentiveSettingsUpdatedEvent,
  MethodologySettingsUpdated as MethodologySettingsUpdatedEvent,
  RebalanceIterated as RebalanceIteratedEvent,
  Rebalanced as RebalancedEvent,
  RipcordCalled as RipcordCalledEvent,
  Rebalanced
} from "../../generated/FlexibleLeverageStrategyAdapter/FlexibleLeverageStrategyAdapter"
import {
  ExchangeAdded as ExchangeAddedEvent,
  ExchangeRemoved as ExchangeRemovedEvent,
  ExchangeUpdated as ExchangeUpdatedEvent
} from "../../generated/FlexibleLeverageStrategyExtension/FlexibleLeverageStrategyExtension"
import {
  AnyoneCallableUpdated,
  CallerStatusUpdated,
  Disengaged,
  Engaged,
  ExchangeAdded,
  ExchangeRemoved,
  ExchangeUpdated,
  ExecutionSettingsUpdated,
  IncentiveSettingsUpdated,
  MethodologySettingsUpdated,
  RipcordCalled,
  Transfer as TransferEntity,
  Rebalance,
  Transaction,
  RebalanceDetails
} from "../../generated/schema"
import {
  Approval,
  ComponentAdded,
  ComponentRemoved,
  DefaultPositionUnitEdited,
  ExternalPositionDataEdited,
  ExternalPositionUnitEdited,
  Invoked,
  ManagerEdited,
  ModuleAdded,
  ModuleInitialized,
  ModuleRemoved,
  PendingModuleRemoved,
  PositionModuleAdded,
  PositionModuleRemoved,
  PositionMultiplierEdited,
  Transfer
} from "../../generated/SetToken/SetToken"
import { createGenericId } from "../utils";

export function handleTransfer(event: Transfer): void {
  let id = event.transaction.hash.toHexString();
  let FliTransferEntity = new TransferEntity(id);
  FliTransferEntity.txnHash = event.transaction.hash;
  FliTransferEntity.timestamp = event.block.timestamp
  FliTransferEntity.from = event.params.from
  FliTransferEntity.to = event.params.to
  FliTransferEntity.value = event.params.value
  FliTransferEntity.save()
}

export function handleExchangeAdded(event: ExchangeAddedEvent): void {
  let entity = new ExchangeAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._exchangeName = event.params._exchangeName
  entity.twapMaxTradeSize = event.params.twapMaxTradeSize
  entity.exchangeLastTradeTimestamp = event.params.exchangeLastTradeTimestamp
  entity.incentivizedTwapMaxTradeSize =
    event.params.incentivizedTwapMaxTradeSize
  entity.leverExchangeData = event.params.leverExchangeData
  entity.deleverExchangeData = event.params.deleverExchangeData
  entity.save()
}

export function handleExchangeRemoved(event: ExchangeRemovedEvent): void {
  let entity = new ExchangeRemoved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._exchangeName = event.params._exchangeName
  entity.save()
}

export function handleExchangeUpdated(event: ExchangeUpdatedEvent): void {
  let entity = new ExchangeUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._exchangeName = event.params._exchangeName
  entity.twapMaxTradeSize = event.params.twapMaxTradeSize
  entity.exchangeLastTradeTimestamp = event.params.exchangeLastTradeTimestamp
  entity.incentivizedTwapMaxTradeSize =
    event.params.incentivizedTwapMaxTradeSize
  entity.leverExchangeData = event.params.leverExchangeData
  entity.deleverExchangeData = event.params.deleverExchangeData
  entity.save()
}

export function handleAnyoneCallableUpdated(
  event: AnyoneCallableUpdatedEvent
): void {
  let entity = new AnyoneCallableUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._status = event.params._status
  entity.save()
}

export function handleCallerStatusUpdated(
  event: CallerStatusUpdatedEvent
): void {
  let entity = new CallerStatusUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._caller = event.params._caller
  entity._status = event.params._status
  entity.save()
}

export function handleDisengaged(event: DisengagedEvent): void {
  let entity = new Disengaged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp
  entity.currentLeverageRatio = event.params._currentLeverageRatio
  entity.newLeverageRatio = event.params._newLeverageRatio
  entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity.totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
}

export function handleEngaged(event: EngagedEvent): void {
  let entity = new Engaged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp
  entity.currentLeverageRatio = event.params._currentLeverageRatio
  entity.newLeverageRatio = event.params._newLeverageRatio
  entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity.totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
}

export function handleExecutionSettingsUpdated(
  event: ExecutionSettingsUpdatedEvent
): void {
  let entity = new ExecutionSettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._unutilizedLeveragePercentage =
    event.params._unutilizedLeveragePercentage
  entity._twapMaxTradeSize = event.params._twapMaxTradeSize
  entity._twapCooldownPeriod = event.params._twapCooldownPeriod
  entity._slippageTolerance = event.params._slippageTolerance
  entity._exchangeName = event.params._exchangeName
  entity._exchangeData = event.params._exchangeData
  entity.save()
}

export function handleIncentiveSettingsUpdated(
  event: IncentiveSettingsUpdatedEvent
): void {
  let entity = new IncentiveSettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._etherReward = event.params._etherReward
  entity._incentivizedLeverageRatio = event.params._incentivizedLeverageRatio
  entity._incentivizedSlippageTolerance =
    event.params._incentivizedSlippageTolerance
  entity._incentivizedTwapCooldownPeriod =
    event.params._incentivizedTwapCooldownPeriod
  entity._incentivizedTwapMaxTradeSize =
    event.params._incentivizedTwapMaxTradeSize
  entity.save()
}

export function handleMethodologySettingsUpdated(
  event: MethodologySettingsUpdatedEvent
): void {
  let entity = new MethodologySettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._targetLeverageRatio = event.params._targetLeverageRatio
  entity._minLeverageRatio = event.params._minLeverageRatio
  entity._maxLeverageRatio = event.params._maxLeverageRatio
  entity._recenteringSpeed = event.params._recenteringSpeed
  entity._rebalanceInterval = event.params._rebalanceInterval
  entity.save()
}

const createRebalanceDetails = (id: string, _currentLeverageRatio: BigInt, _newLeverageRatio: BigInt, _totalRebalanceNotional: BigInt, _chunkRebalanceNotional: BigInt ): RebalanceDetails => {
  let entity = new RebalanceDetails(id)
  entity.currentLeverageRatio= _currentLeverageRatio
  entity.newLeverageRatio= _newLeverageRatio
  entity.chunkRebalanceNotional= _chunkRebalanceNotional
  entity.totalRebalanceNotional= _totalRebalanceNotional
  return entity
}

export function handleRebalanceIteratedEvent(event: RebalanceIteratedEvent): void {
  const id = createGenericId(event);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`)
  const txn = new Transaction(event.transaction.hash.toHex() + '--' + 'rebalance-txn')
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save()
  let rebalanceDetailsEntity = createRebalanceDetails(id, event.params._currentLeverageRatio, event.params._newLeverageRatio, event.params._totalRebalanceNotional, event.params._chunkRebalanceNotional);
  rebalanceDetailsEntity.save()
  entity.transaction = txn.id;
  entity.transactionHash = event.transaction.hash;
  entity.rebalanceDetails = rebalanceDetailsEntity.id
  entity.save()
}

export function handleRebalanceEvent(event: RebalancedEvent): void {
  const id = createGenericId(event);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`)
  const txn = new Transaction(event.transaction.hash.toHex() + '--' + 'rebalance-txn')
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save()
  let rebalanceDetailsEntity = createRebalanceDetails(id, event.params._currentLeverageRatio, event.params._newLeverageRatio, event.params._totalRebalanceNotional, event.params._chunkRebalanceNotional);
  rebalanceDetailsEntity.save()
  entity.transaction = txn.id;
  entity.transactionHash = event.transaction.hash;
  entity.rebalanceDetails = rebalanceDetailsEntity.id
  entity.save()
}

export function handleRipcordCalled(event: RipcordCalledEvent): void {
  let entity = new RipcordCalled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp
  entity.currentLeverageRatio = event.params._currentLeverageRatio
  entity.newLeverageRatio = event.params._newLeverageRatio
  entity.rebalanceNotional = event.params._rebalanceNotional
  entity.etherIncentive = event.params._etherIncentive
  entity.save()
}
