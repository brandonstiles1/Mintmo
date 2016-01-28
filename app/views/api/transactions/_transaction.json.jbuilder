json.extract! transaction, :id, :description, :notes, :date, :account_id

json.set! :amount, number_to_currency(transaction.amount, precision: 2)
json.set! :amount_n, transaction.amount
json.set! :institution_id, transaction.institution.id
json.set! :category, transaction.category.name
