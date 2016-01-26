class StaticPagesController < ApplicationController

  before_action :redirect_logged_out_users

  def root
  end

  def redirect_logged_out_users
    redirect_to new_session_url unless logged_in?
  end
end
