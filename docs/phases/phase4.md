# Phase 4: Allow Complex Styling in Notes (1 day)

## Rails
### Models
* Followers
* Likes
* Comments

### Controllers
* Api::NewsfeedController (index)

### Views
* newsfeed/index.json.jbuilder

## Flux
### Views (React Components)
* NewsfeedIndex
* NewsfeedIndexItem

### Stores
* Newsfeed

### Actions
* NewsfeedActions.fetchFeed -> triggers ApiUtil
* NewsfeedActions.fetchSingleFeedItem
* NewsfeedActions.createLike
* NewsfeedActions.editComment
* NewsfeedActions.destroyCategory
* NewsfeedActions.destroyLike

### ApiUtil
* ApiUtil.fetchFeed
* ApiUtil.fetchSingleFeedItem
* ApiUtil.createLike
* ApiUtil.editComment
* ApiUtil.destroyLike
* ApiUtil.destroyComment


## Gems/Libraries
