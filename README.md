# FresherNote

[Mintmo][heroku] **NB:** This should be a link to your production site

[heroku]: http://mintmo.herokuapp.com/

## Minimum Viable Product

Mintmo is a web application inspired by Mint and Venmo built using Ruby on Rails
and React.js. Mintmo allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out (optionally with Facebook)
- [ ] Link to their financial Asset Accounts (Bank Accounts, Credit Cards, Loans, Investments, Property)
- [ ] Read, edit, filter, and delete transactions
- [ ] Tag transactions with multiple tags and search transactions by tag
- [ ] Add notes to transactions
- [ ] Make transactions public or private
- [ ] View a newsfeed of their public transactions and friends public transactions
- [ ] Allow users to to like and comment on public transactions
- [ ] **Maybe** *if time permits and it is feasible* see a graphic representation of their financial transactions

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Account and Institution Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Accounts.

[Details][phase-one]

### Phase 2: Flux Architecture and Account CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, an Account store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Account `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Accounts can be created, read, edited and destroyed in the browser. Accounts should
save to the database when the form loses focus or is left idle after editing.

[Details][phase-two]

### Phase 3: Transactions and Tags (2 days)

Phase 3 adds transactions to the Accounts. Transactions belong to an Account, which has
its own `TransactionIndex` view. Create JSON API for Transactions. Notes can also now be
tagged with single category. Users filter transactions in a separate `SearchIndex`
view by searching for their category and account.

[Details][phase-three]

### Phase 4: Followers and Newsfeed (2 day)

I will implement a follower feature where users can follow other users, and public transactions will be posted in a newsfeed, where users can comment and like transactions.

[Details][phase-four]

### Phase 5: Tags (1 day)

Phase 5 introduces tags for transactions. Users can add multiple tags to each transaction, and filter the transaction index by tags.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

I will do major CSS clean up work and add styling flourishes.

### Bonus Features (TBD)
- [ ] Add location to transactions
- [ ] View transactions in graphs
- [ ] Pagination / infinite scroll for Transactions Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
