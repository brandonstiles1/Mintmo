# == Schema Information
#
# Table name: transactions
#
#  id          :integer          not null, primary key
#  account_id  :integer          not null
#  amount      :decimal(8, 2)    not null
#  description :string           not null
#  notes       :text
#  date        :datetime         not null
#  is_private? :boolean          default(TRUE)
#  created_at  :datetime
#  updated_at  :datetime
#

class Transaction < ActiveRecord::Base
  validates :account, :amount, :description, :date, presence: true

  belongs_to :account
  has_one :user, through: :account, source: :user
  has_one :institution, through: :account, source: :institution
end