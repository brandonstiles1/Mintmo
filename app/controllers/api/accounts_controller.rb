class Api::AccountsController < ApplicationController

  before_action :redirect_logged_out_users

  def index
    @accounts = current_user.accounts.includes(:institution)
    render :index
  end

  def create
    @account = current_user.accounts.create!(account_params)
    @account.save!
    render json: @account.to_json
    # if @account.save
    #   # redirect_to api_account_url(@account)
    #   render :show
    # else
    #   flash.now[:errors] = ["Invalid information. Please enter all information."]
    #   render :new
    # end
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
    params.require(:account).permit(:name, :institution_id, :user_id,
      :balance, :account_type)
  end

end
