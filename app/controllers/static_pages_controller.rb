class StaticPagesController < ApplicationController

  before_action :redirect_logged_out_users

  def root
  end


end
