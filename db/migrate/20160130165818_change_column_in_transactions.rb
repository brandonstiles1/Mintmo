class ChangeColumnInTransactions < ActiveRecord::Migration
  def change
    drop_table :categories
    remove_column :transactions, :category_id
    add_column :transactions, :category, :string, default: "UNCATEGORIZED"
  end
end
