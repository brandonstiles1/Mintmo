json.extract! transaction, :id, :description, :notes, :date, :account_id

json.amount number_to_currency(transaction.amount, precision: 2)
json.amount_n transaction.amount
json.institution_id transaction.institution.id
json.category transaction.category.name
