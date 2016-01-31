class Api::UsersController < ApplicationController

  # before_action :redirect_logged_out_users

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = current_user
    @user.update!(user_params)
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in_user!(@user)
      render :show
    else
      render json: ["Incorrect email/password combination."], status: 401
    end
  end

  def destroy
   @user = current_user
   @user.destroy!
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :age, :gender)
  end
end
