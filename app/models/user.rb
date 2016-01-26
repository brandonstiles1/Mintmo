# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  age             :integer          not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :email, :password_digest, :session_token, :fname, :lname, :age, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token


  def self.generate_session_token
   SecureRandom.urlsafe_base64
  end

  def reset_session_token!
   self.session_token = User.generate_session_token
   save!
  end

  def ensure_session_token
   self.session_token ||= User.generate_session_token
  end

  def password=(password)
   @password = password
   self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
   BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
   user = User.find_by_email(email)
   return nil unless user && user.is_password?(password)
   user
  end

end
