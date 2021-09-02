# Index Coop Subgraph
### Important data points
* Fee Accruel
  * Streaming Fee
  * Rebalance Rewards Accrual
  * Methodologist Fee


## Fee Modules
### Fee Split Module
* Contract responsible for paying partnership % fees. AFAIK this occurs once a month.
* [FeeSplitAdapter Contract](https://etherscan.io/address/0x26f81381018543eca9353bd081387f68fae15ced)

 
### Streaming Fee Module
[https://etherscan.io/address/0x08f866c74205617b6f3903ef481798eced10cdec#readContract]
### Base Fee Adapter

## Start Blocks
* ETH2xFLI
  * 12035541


## Components (Assets)
Array of underlying assets making up a tokenset
* ID
* 

## 
* Fee Adapter
  * Contract Creation
  * Update Fee Recipient
  * Ownership Transferred
  * Accrue Fees
  * Register Upgrade
  * Update Caller Status
  * Update Anyone Callable

## Manager
  * Contract Creation
  * Set Manager
  * Set Operator
  * Add Adapter
  * Remove Adapter
  * Change Methodologist


# Entities
```graphql

type LeverageModule @entity {
  id: ID!
  currentLeverageRatio: int!
  newLeverageRatio: 
  manager: [Manager!]! @derivedFrom(field: manager)
}

type RebalanceEvent @entity {
  id: !ID
  currentLeverageRatio: int!
  newLeverageRatio: int!
  exchangeUsed: string! # UniswapV3ExchangeAdapter
  leverageModule: [leverageModule!]! @derivedFrom(field: leverageModule)
}


type Adapter @entity {
  id: ID!
  address: Bytes!
  manager: [Manager!]! @derivedFrom(field: manager)
  setToken: [SetToken!]! @derivedFrom(field: setToken) # 
  feeSplit: !int
  feeModule: 
}


type Module @entity {
  id: ID!
  date: Int!
  gasUsed: Int!
  components: [Component!]
  leverageModule
}

type Component @entity {
    id: ID!
    address: Bytes! # USDC addrress
    name: String! # USDC
    units: Int! # Units of token in SetToken
    setToken: @derivedFrom(field: setToken)
}

type FeeModule @entity {
  id: !ID
  name: String!
  address: Bytes!
  manager: Manager!
  streamingFee
  streaming: Int!
}

type Manager @entity {
  id: ID!
  address: Bytes!
  adapters: [Adapter!]
  methodologist: 
}

type SetToken @entity {
  id: ID!
  date: Int!
  name: String!
  totalSupply: BigInt!
  address: Bytes!
  components: [Component!]
  modules: [Modules!]
  manager: Manager!
}

```
