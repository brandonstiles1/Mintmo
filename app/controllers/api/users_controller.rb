class Api::UsersController < ApplicationController
  def show
    @user = current_user
  end

  def update
    current_user.update!(user_params)
    render :show
  end

  def destroy
   @user = current_user
   @user.destroy!
   redirect_to new_session_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :age)
  end
end
