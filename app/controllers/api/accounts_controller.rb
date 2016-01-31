class Api::AccountsController < ApplicationController

  before_action :redirect_logged_out_users

  def index
    @accounts = current_user.accounts.includes(:institution, :transactions)
    render :index
  end

  def create
    @account = current_user.accounts.create!(account_params)
    @account.generate_balance
    @account.generate_account_type
    @account.save!
    @account.create_transactions
    render :show
  end

  def show
    @account = Account.includes(transactions: [:institution]).find(params[:id])
    render :show
  end

  def new
    @account = current_user.accounts.new
  end

  def update
    @account = Account.find(params[:id])
    @account.update!(account_params)
    render :show
  end

  def destroy
    @account = Account.find(params[:id])
    @account.destroy!
    @accounts = current_user.accounts
    render :index
  end

  private
  def account_params
    params.require(:account).permit(
      :name,
      :institution_id,
      :user_id,
      :balance,
      :account_type
    )
  end

end
