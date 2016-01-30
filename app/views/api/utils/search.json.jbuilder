json.total_count @search_results.total_count
json.results do
  json.array! @search_results do |result|
    result = result.searchable
    json.partial!("api/transactions/transaction", transaction: result)
  end
end
