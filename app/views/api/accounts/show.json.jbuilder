json.extract! do
  json.id account.id
  json.name account.name
  json.account_type account.account_type
  json.institution account.institution.name
  json.balance number_to_currency(account.balance, precision: 2)
  json.balance_n account.balance
end
