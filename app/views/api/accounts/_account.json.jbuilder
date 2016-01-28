json.extract! account, :id, :name, :account_type

json.set! :institution, account.institution.name
json.set! :balance, number_to_currency(account.balance, precision: 2)
json.set! :balance_n, account.balance
