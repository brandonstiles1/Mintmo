# Phase 5: Tags

## Rails
### Models
* tags

### Controllers
* Api::TagsController (create, destroy, index, show, update)

### Views

## Flux
### Views (React Components)
* TagsIndex

### Stores
* Tags

### Actions
* ApiActions.receiveAllTags -> triggered by ApiUtil
* ApiActions.deleteTag
* TagActions.fetchAllTags -> triggers ApiUtil
* TagActions.createTag
* TagActions.updateTag
* TagActions.destroyTag

### ApiUtil
* ApiUtil.fetchAllTags
* ApiUtil.createTag
* ApiUtil.updateTag
* ApiUtil.destroyTag

## Gems/Libraries
