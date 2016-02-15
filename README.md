# Mintmo

[Mintmo][mintmo]

[mintmo]: http://www.mymintmo.com/

## Summary

[Mintmo][mintmo] is a single-page web application inspired by Mint built using Ruby on Rails
utilizing React.js/flux architecture. Mintmo allows users to:

- [ ] Create an account
- [ ] Log in / Log out (optionally with Facebook)
- [ ] Link to their financial Asset Accounts (Bank Accounts, Credit Cards, Loans, Investments, Property)
- [ ] Add and delete financial Asset Accounts
- [ ] Read, edit, and filter transactions
- [ ] Add notes to transactions
- [ ] View a graphic representation of their financial transactions
- [ ] Update profile information, including adding a profile picture
- [ ] Search for transactions within accounts, by account type, and throughout all accounts

## Overall Structure

#### Back end
The app was built using Ruby on Rails on the back end with a postgreSQL database. Back end structure is RESTful and all  the data requests use AJAX and are fulfilled with a JSON API. Associations are used to prefetch data in order to minimize SQL queries to the database.

#### Front end
The front end is built completely in [React.js][React] and JavaScript and utilizes React's [Flux][Flux] architecture. React's virtual DOM allows for lightnight-quick rerendering without requiring new pages to be sent from the server. Even modals appear/disappear using React rather than toggling CSS display properties.

#### Libraries

Mintmo uses:
- [React.js][React]
- [Flux][Flux]
- [Chart.js][Chart.js]
- [react-chartjs][react-chartjs]
- [BCrypt](https://github.com/codahale/bcrypt-ruby) for authorization
- [Paperclip](https://github.com/thoughtbot/paperclip) to store user profile images using Amazon Web Services
- [figaro](https://github.com/laserlemon/figaro) to securely store keys and other important data.
- [pg_search][pg_search] to search transactions
- [accounting.js](https://github.com/openexchangerates/accounting.js) to format amounts into currency
- [OmniAuth Facebook][OmniAuth Facebook]

## Primary Components

#### User Authorization
User authentication is handled in Rails using BCrypt for password hashing. Passwords are not saved to the database, only password hashes. When users log in, the password they provide is rehashed and checked against the original encrypted password hash to verify credentials.

#### OmniAuth
Mintmo uses [OmniAuth Facebook][OmniAuth Facebook] to allow users to sign in using their Facebook credentials. Data including profile pictures, emails, and names are retrieved from the OmniAuth info hash to populate new user profiles.

#### Financial Accounts
Financial institutions don't have public APIs that allow third-party sites to access account information such as transaction history and balance. In fact, Mint.com uses a data aggregation agent, Intuit, to do this for them. Therefore, this feature is only a demo simulation. You can provide fake account data, and Mintmo will populate an account with transactions and a balance.

#### Transactions
Transactions are the heart of Mintmo, and are designed to be extremely flexible. Users can edit, sort, and filter transactions on the fly. Just by typing in the transaction description and category columns, users can update their transaction details quickly and easily.


#### Search
Mintmo utilizes [pg_search][pg_search] multisearch to search for transactions across single accounts, by account type, and by attributes including amount, description, category, and more.



[Chart.js]:http://www.chartjs.org/
[react-chartjs]:https://github.com/jhudson8/react-chartjs
[pg_search]:https://github.com/Casecommons/pg_search
[OmniAuth Facebook]:https://github.com/mkdynamic/omniauth-facebook
[React]:https://facebook.github.io/react/
[Flux]:https://facebook.github.io/flux/
