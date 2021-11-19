import { Fee, Manager } from '../../generated/schema';
import { FeeActualized } from '../../generated/StreamingFeeModule/StreamingFeeModule';
import { StreamingFeeUpdated } from '../../generated/StreamingFeeModule/StreamingFeeModule';
import { FeeRecipientUpdated } from '../../generated/StreamingFeeModule/StreamingFeeModule';
import { fetchManager } from '../utils/setToken';
import { createFee, createManager } from './issuanceEvents';

export function handleFeeActualized(event: FeeActualized): void {
  let entity = new Fee(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let setTokenAddress = event.params._setToken

  let feeEntity = createFee(event.transaction.hash.toHex() + '-' + event.logIndex.toString(), event.block.timestamp, event.params._managerFee, event.params._protocolFee)

  let currentManager = Manager.load(fetchManager(setTokenAddress))

  if (currentManager == null) {
    currentManager = createManager(fetchManager(setTokenAddress), setTokenAddress)
  }

  currentManager.save()
  feeEntity.manager = currentManager.id;

  feeEntity.save();
}
