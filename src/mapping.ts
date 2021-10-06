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
  RipcordCalled as RipcordCalledEvent
} from "../generated/FlexibleLeverageStrategyAdapter/FlexibleLeverageStrategyAdapter"
import {
  AnyoneCallableUpdated,
  CallerStatusUpdated,
  Disengaged,
  Engaged,
  ExecutionSettingsUpdated,
  IncentiveSettingsUpdated,
  MethodologySettingsUpdated,
  RebalanceIterated,
  Rebalanced,
  RipcordCalled
} from "../generated/schema"

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

export function handleRebalanced(event: RebalancedEvent): void {
  let entity = new Rebalanced(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._currentLeverageRatio = event.params._currentLeverageRatio
  entity._newLeverageRatio = event.params._newLeverageRatio
  entity._chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity._totalRebalanceNotional = event.params._totalRebalanceNotional
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
