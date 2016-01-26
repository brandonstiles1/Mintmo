class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
     log_in_user!(@user)
     flash[:message] = ["Welcome to Mintmo, #{@user.fname}! Let's get started"]
     redirect_to root_url
    else
     flash.now[:errors] = @user.errors.full_messages
     render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :age)
  end

end
