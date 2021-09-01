# Index Coop Products Subgraph
* Minting
* Redeeming
* Rebelancing
* Debt Issuance
* DEX Exchanges


## Fee Modules
### Fee Split Module
* Occurs once a month.
* [FeeSplitAdapter Contract](https://etherscan.io/address/0x26f81381018543eca9353bd081387f68fae15ced)

### Events
* Fee Accruel 
* Transfering Fees 
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


# Events


```graphql

type LeverageModule {
  id: ID!
  currentLeverageRatio: int!
  newLeverageRatio: 
  manager: [Manager!]! @derivedFrom(field: manager)
}

type RebalanceEvent {
  id: !ID
  currentLeverageRatio: int!
  newLeverageRatio: int!
  exchangeUsed: string! # UniswapV3ExchangeAdapter
  leverageModule: [leverageModule!]! @derivedFrom(field: leverageModule)
}

type Adapter {
  id: ID!
  address: Bytes!
  manager: [Manager!]! @derivedFrom(field: manager)
  setToken: [SetToken!]! @derivedFrom(field: setToken) # 
  feeSplit: !int
  feeModule: 
}


type Module {
  id: ID!
  date: Int!
  gasUsed: Int!
  components: [Component!]
  leverageModule
}

type Component {
    id: ID!
    address: Bytes! # USDC addrress
    name: String! # USDC
    units: Int! # Units of token in SetToken
    setToken: @derivedFrom(field: setToken)
}

type FeeModule {
  id: !ID
  name: String!
  address: Bytes!
  streaming: Int!
}

type Manager {
  id: ID!
  address: Bytes!
  adapters: [Adapter!]
  methodologist: 
}

type SetToken {
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
