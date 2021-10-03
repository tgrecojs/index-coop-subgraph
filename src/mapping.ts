import { BigInt, Entity } from "@graphprotocol/graph-ts"
import {
  Eth2xFli,
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
} from "../generated/Eth2xFli/Eth2xFli"
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
  RebalanceIterated,
  Rebalanced,
  RipcordCalled
} from "../generated/schema"

import {
  AnyoneCallableUpdated as AnyoneCallableUpdatedEvent,
  CallerStatusUpdated as CallerStatusUpdatedEvent,
  Disengaged as DisengagedEvent,
  Engaged as EngagedEvent,
  ExchangeAdded as ExchangeAddedEvent,
  ExchangeReoved as ExchangeRemovedEvent,
  ExchangeUpdated as ExchangeUpdatedEvent,
  ExecutionSettingsUpdated as ExecutionSettingsUpdatedEvent,
  IncentiveSettingsUpdated as IncentiveSettingsUpdatedEvent,
  MethodologySettingsUpdated as MethodologySettingsUpdatedEvent,
  RebalanceIterated as RebalanceIteratedEvent,
  Rebalanced as RebalancedEvent,
  RipcordCalled as RipcordCalledEvent
} from "../generated/FlexibleLeverageStrategyExtension/FlexibleLeverageStrategyExtension"

export function handleAnyoneCallableUpdated(
  event: AnyoneCallableUpdatedEvent
): void {
  let entity = new AnyoneCallableUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp;
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
  entity._currentLeverageRatio = event.params._currentLeverageRatio
  entity._newLeverageRatio = event.params._newLeverageRatio
  entity._chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity._totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
}


export function handleEngaged(event: EngagedEvent): void {
  let entity = new Engaged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._currentLeverageRatio = event.params._currentLeverageRatio
  entity._newLeverageRatio = event.params._newLeverageRatio
  entity._chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity._totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
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

export function handleExecutionSettingsUpdated(
  event: ExecutionSettingsUpdatedEvent
): void {
  let entity = new ExecutionSettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._unutilizedLeveragePercentage =
    event.params._unutilizedLeveragePercentage
  entity._twapCooldownPeriod = event.params._twapCooldownPeriod
  entity._slippageTolerance = event.params._slippageTolerance
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

export function handleRebalanceIterated(event: RebalanceIteratedEvent): void {
  let entity = new RebalanceIterated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._currentLeverageRatio = event.params._currentLeverageRatio
  entity._newLeverageRatio = event.params._newLeverageRatio
  entity._chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity._totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
}

// const getGasProps = ({ gasPrice, gasUsed }) => ({
//   gasPrice,
//   gasUsed
// })
// const getRebalancedData = ({ block, params, transaction, ...rest }) => ({
//   timestamp: block.timestap,
//   _currentLeverageRatio: params._currentLeverageRatio,
//   _newLeverageRatio: params._newLeverageRatio,
//   _chunkRebalanceNotional: params._chunkRebalanceNotional,
//   _totalRebalanceNotional: params._totalRebalanceNotional,
//   gasUsed: params._totalRebalanceNotional,
//   gasPrice: transaction.gasPrice,
//   gasUsed: transaction.gasUsed
// })

export function handleRebalanced(event: RebalancedEvent): void {
  let entity = new Rebalanced(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp;
  entity._currentLeverageRatio = event.params._currentLeverageRatio
  entity._newLeverageRatio = event.params._newLeverageRatio
  entity._chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity._totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.gasUsed = event.transaction.gasUsed

  entity.gasPrice = event.transaction.gasPrice;
  entity.save()
}

export function handleRipcordCalled(event: RipcordCalledEvent): void {
  let entity = new RipcordCalled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._currentLeverageRatio = event.params._currentLeverageRatio
  entity._newLeverageRatio = event.params._newLeverageRatio
  entity._rebalanceNotional = event.params._rebalanceNotional
  entity._etherIncentive = event.params._etherIncentive
  entity.save()
}

export function handleComponentAdded(event: ComponentAdded): void { }

export function handleComponentRemoved(event: ComponentRemoved): void { }

export function handleDefaultPositionUnitEdited(
  event: DefaultPositionUnitEdited
): void { }

export function handleExternalPositionDataEdited(
  event: ExternalPositionDataEdited
): void { }

export function handleExternalPositionUnitEdited(
  event: ExternalPositionUnitEdited
): void { }

export function handleInvoked(event: Invoked): void { }

export function handleManagerEdited(event: ManagerEdited): void { }

export function handleModuleAdded(event: ModuleAdded): void { }

export function handleModuleInitialized(event: ModuleInitialized): void { }

export function handleModuleRemoved(event: ModuleRemoved): void { }

export function handlePendingModuleRemoved(event: PendingModuleRemoved): void { }

export function handlePositionModuleAdded(event: PositionModuleAdded): void { }

export function handlePositionModuleRemoved(
  event: PositionModuleRemoved
): void { }

export function handlePositionMultiplierEdited(
  event: PositionMultiplierEdited
): void { }

export function handleTransfer(event: Transfer): void { }
