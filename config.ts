import { Bytes } from "@graphprotocol/graph-ts"

export class SetToken {
  name: string
  rootAddress: string
  issuanceAbiName: string
  issuanceAbi: string
  issuanceAddress: string
  streamingFeeAbi: string
  streamingFeeAddress: string
}
export let contracts: SetToken[] = [
  {
    name: 'DPI Contract',
    rootAddress: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
    issuanceAbiName: 'BasicIssuanceModule',
    issuanceAbi: './abis/BasicIssuanceModule.json',
    issuanceAddress: '0xd8EF3cACe8b4907117a45B0b125c68560532F94D',
    streamingFeeAbi: './abis/StreamingFeeModule.json',
    streamingFeeAddress: '0x08f866c74205617B6F3903EF481798EcED10cDEC',
  },
  {
    name: 'ETH2xFLI Contract',
    rootAddress: '0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd',
    issuanceAbiName: 'DebtIssuanceModule',
    issuanceAbi: './abis/DebtIssuanceModule.json',
    issuanceAddress: '0x39F024d621367C044BacE2bf0Fb15Fb3612eCB92',
    streamingFeeAbi: './abis/StreamingFeeModule.json',
    streamingFeeAddress: '0x08f866c74205617B6F3903EF481798EcED10cDEC',
  },
  {
    name: 'BTC2xFLI Contract',
    rootAddress: '0x0b498ff89709d3838a063f1dfa463091f9801c2b',
    issuanceAbiName: 'DebtIssuanceModule',
    issuanceAbi: './abis/DebtIssuanceModule.json',
    issuanceAddress: '0x39f024d621367c044bace2bf0fb15fb3612ecb92',
    streamingFeeAbi: './abis/StreamingFeeModule.json',
    streamingFeeAddress: '0x08f866c74205617B6F3903EF481798EcED10cDEC',
  },
  {
    name: 'DATA Contract',
    rootAddress: '0x33d63ba1e57e54779f7ddaeaa7109349344cf5f1',
    issuanceAbiName: 'BasicIssuanceModule',
    issuanceAbi: './abis/BasicIssuanceModule.json',
    issuanceAddress: '0xd8EF3cACe8b4907117a45B0b125c68560532F94D',
    streamingFeeAbi: './abis/StreamingFeeModule.json',
    streamingFeeAddress: '0x08f866c74205617B6F3903EF481798EcED10cDEC',
  },
  {
    name: 'BED Contract',
    rootAddress: '0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6',
    issuanceAbiName: 'BasicIssuanceModule',
    issuanceAbi: './abis/BasicIssuanceModule.json',
    issuanceAddress: '0xd8EF3cACe8b4907117a45B0b125c68560532F94D',
    streamingFeeAbi: './abis/StreamingFeeModule.json',
    streamingFeeAddress: '0x08f866c74205617B6F3903EF481798EcED10cDEC',
  },
  {
    name: 'MVI Contract',
    rootAddress: '0x72e364f2abdc788b7e918bc238b21f109cd634d7',
    issuanceAbiName: 'BasicIssuanceModule',
    issuanceAbi: './abis/BasicIssuanceModule.json',
    issuanceAddress: '0xd8EF3cACe8b4907117a45B0b125c68560532F94D',
    streamingFeeAbi: './abis/StreamingFeeModule.json',
    streamingFeeAddress: '0x08f866c74205617B6F3903EF481798EcED10cDEC',
  },
];
