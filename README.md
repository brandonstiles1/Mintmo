# Mintmo

[Mintmo][heroku]

[heroku]: http://mintmo.herokuapp.com/

## Summary

[Mintmo][heroku] is a web application inspired by Mint built using Ruby on Rails
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
#### Front end
#### Libraries

Mintmo uses:
- [React.js][React]
- [Flux][Flux]
- [Chart.js](http://www.chartjs.org/)
- [react-chartjs](https://github.com/jhudson8/react-chartjs)
- [Bcrypt](https://github.com/codahale/bcrypt-ruby) for authorization
- [Paperclip](https://github.com/thoughtbot/paperclip) to store user profile images using Amazon Web Services
- [figaro](https://github.com/laserlemon/figaro) to securely store keys and other important data.
- [pg_search](https://github.com/Casecommons/pg_search) to search transactions
- [accounting.js](https://github.com/openexchangerates/accounting.js) to format amounts into currency
- [OmniAuth Facebook](https://github.com/mkdynamic/omniauth-facebook)

## Primary Components

#### User Authorization
#### OmniAuth
#### Financial Accounts
#### Transactions
#### Search


[React]:https://facebook.github.io/react/
[Flux]:https://facebook.github.io/flux/
