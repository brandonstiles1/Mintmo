class SessionsController < ApplicationController

  before_action :redirect_logged_in_users, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
      params[:user][:password]
    )

    if @user
      log_in_user!(@user)
      flash[:message] = "Welcome back #{@user.user_name}!"
      redirect_to "static_pages#root"
    else
      flash.now[:errors] = ["Err try that again, mate."]
      render :new
    end
  end

  def destroy
    logout!
    flash.now[:message] = "Peace!"
    redirect_to new_session_url
  end

  def redirect_logged_in_users
    if logged_in?
      redirect_to bands_url
    end
  end
end
