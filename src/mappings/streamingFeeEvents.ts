import { StreamingFee } from '../../generated/schema';
import { FeeActualized } from '../../generated/StreamingFeeModule/StreamingFeeModule';
import { StreamingFeeUpdated } from '../../generated/StreamingFeeModule/StreamingFeeModule';
import { FeeRecipientUpdated } from '../../generated/StreamingFeeModule/StreamingFeeModule';

export function handleFeeActualized(event: FeeActualized): void {
  let entity = new StreamingFee(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.timestamp = event.block.timestamp;
  entity.setToken = event.params._setToken;
  entity.managerFee = event.params._managerFee;
  entity.protocolFee = event.params._protocolFee;
  entity.save();
}

export function handleStreamingFeeUpdated(event: StreamingFeeUpdated): void {
  let entity = new StreamingFee(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.timestamp = event.block.timestamp;
  entity.setToken = event.params._setToken;
  entity.newStreamingFee = event.params._newStreamingFee;
  entity.save();
}

export function handleFeeReciepientUpdated(event: FeeRecipientUpdated): void {
  let entity = new StreamingFee(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.timestamp = event.block.timestamp;
  entity.setToken = event.params._setToken;
  entity.newFeeRecipient = event.params._newFeeRecipient;
  entity.save();
}