json.extract! @account, :id, :name, :account_type, :institution_id, :transactions

json.set! :institution_name, @account.institution.name
json.set! :balance, number_to_currency(@account.balance, precision: 2)
json.set! :balance_n, @account.balance
