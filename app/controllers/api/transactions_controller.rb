class Api::TransactionsController < ApplicationController

  before_action :redirect_logged_out_users

  def index
    @transactions = current_user.transactions.includes(:institution, :transaction)
    render :index
  end

  # def create
  #   @transaction = current_user.transactions.create!(transaction_params)
  #   @transaction.save!
  #   render json: @transaction.to_json
  # end
  #
  # def new
  #   @transaction = current_user.transactions.new
  # end

  def update
    @transaction = Transaction.find(params[:id])
    @transaction.update!(transaction_params)
    render :show
  end

  # def destroy
  #   @transaction = Transaction.find(params[:id])
  #   @transaction.destroy!
  #   @transactions = current_user.transactions
  #   render :index
  # end

  private
  def transaction_params
    params.require(:transaction).permit(
      :transaction_id,
      :amount,
      :description,
      :notes,
      :date,
      :is_private?
    )
  end

end
