json.array! @transactions do |transaction|
  json.id transaction.id
  json.name transaction.name
  json.description transaction.description
  json.notes transaction.notes
  json.date transaction.date
  json.account_id transaction.account_id
  json.institution_id transaction.institution.id
  json.amount number_to_currency(transaction.amount, precision: 2)
  json.amount_n transaction.amount
end
