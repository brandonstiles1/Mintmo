# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* AccountsIndex
  - AccountIndexItem (this is really the transactions index filtered by account)
* AccountForm

### Stores
* Accounts

### Actions
* ApiActions.receiveAllAccounts -> triggered by ApiUtil
* ApiActions.receiveSingleAccount
* ApiActions.deleteAccounts
* NoteActions.fetchAllAccounts -> triggers ApiUtil
* NoteActions.fetchSingleAccount
* NoteActions.createAccount
* NoteActions.editAccount
* NoteActions.destroyAccount

### ApiUtil
* ApiUtil.fetchAllAccounts
* ApiUtil.fetchSingleAccount
* ApiUtil.createAccount
* ApiUtil.editAccount
* ApiUtil.destroyAccount

## Gems/Libraries
* Flux Dispatcher (npm)
