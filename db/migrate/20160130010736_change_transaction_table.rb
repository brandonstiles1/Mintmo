class ChangeTransactionTable < ActiveRecord::Migration
  def change
    remove_column :transactions, :description
    add_column :transactions, :description, :string
  end
end
