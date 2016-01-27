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

class Account < ActiveRecord::Base
  ACCOUNT_TYPES = %w(Cash, Credit Cards, Loans, Investments, Property)

  validates :name, :institution, :user, :balance, :account_type, presence: true
  validates :account_type, inclusion: ACCOUNT_TYPES

  belongs_to :institution
  belongs_to :user
end
