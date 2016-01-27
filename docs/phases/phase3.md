# Phase 3: Transactions and Tags (2 days)

## Rails
### Models
* Transaction
* Categories
* TransactionCategory

### Controllers
* Api::TransactionsController (create, index, show, update)
* Api::CategoriesController (create, destroy, index, show, update)

### Views
* transactions/index.json.jbuilder
* transactions/show.json.jbuilder

## Flux
### Views (React Components)
* TransactionsIndex
  - TransactionsIndexItem
* TransactionsForm
* SearchIndex
* CategoriesForm

### Stores
* Transactions
* Categories

### Actions
* ApiActions.receiveAllTransactions -> triggered by ApiUtil
* ApiActions.receiveSingleTransaction
* TransactionActions.fetchAllTransactions -> triggers ApiUtil
* TransactionActions.fetchSingleTransaction
* CategoryActions.createCateogry
* TransactionActions.editTransaction
* CategoryActions.editCategory
* CategoryActions.destroyCategory

### ApiUtil
* ApiUtil.fetchAllTransactions
* ApiUtil.fetchSingleTransaction
* ApiUtil.createCategory
* ApiUtil.editTransaction
* ApiUtil.editCategory
* ApiUtil.destroyCategory

## Gems/Libraries
