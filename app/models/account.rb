# == Schema Information
#
# Table name: accounts
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  institution_id :string           not null
#  user_id        :string           not null
#  balance        :decimal(8, 2)    not null
#  account_type   :string           not null
#  created_at     :datetime
#  updated_at     :datetime
#

ACCOUNT_TYPES = [
  "Cash",
  "Credit Cards",
  "Loan",
  "Investments"
]

CATEGORY_TYPES = [
  "Restaurants",
  "UNCATEGORIZED",
  "Transport",
  "Bills & Utilities",
  "Education",
  "Entertainment",
  "Fees & Charges",
  "Financial",
  "Home",
  "Income",
  "Kids",
  "Misc Expenses",
  "Shopping",
  "Taxes",
  "Travel"
]

class Account < ActiveRecord::Base

  validates :name, :institution, :user, :balance, :account_type, presence: true
  validates :account_type, inclusion: ACCOUNT_TYPES

  belongs_to :institution
  belongs_to :user

  has_many :transactions



  def create_transactions
    20.times do |time|
      category = CATEGORY_TYPES.sample
      description = Faker::Commerce.product_name
      date = Faker::Date.backward(rand(1000))
      amount = ((rand(10000)/100.23) - 50).round(2)

      self.transactions.create(
        category: category,
        description: description,
        date: date,
        amount: amount
      )
    end
  end

  def correct_balance
    new_balance = 0
    self.transactions.each do |transaction|
      new_balance += transaction.amount
    end
    self.balance = new_balance
  end

end
