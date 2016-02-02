# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime
#  updated_at          :datetime
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  fname               :string
#  lname               :string
#  gender              :string
#  age                 :string
#  provider            :string
#  uid                 :string
#

class User < ActiveRecord::Base
  attr_reader :password

  has_attached_file :avatar, default_url: "missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :email, format: { with: /\A([^@\s]+)@(([-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :gender, inclusion: %w(Male Female), if: -> { gender }
  validates_uniqueness_of :uid, scope: :provider, if: -> { uid }

  after_initialize :ensure_session_token

  #associations
  has_many :accounts
  has_many :institutions, through: :accounts, source: :institution
  has_many :transactions, through: :accounts, source: :transactions


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

  def self.find_or_create_by_auth_hash(auth_hash)

    provider = auth_hash.provider
    uid = auth_hash.uid

    user = User.find_by(provider: provider, uid: uid)
    return user if user

    fname = auth_hash.info.name.split(" ").first
    lname = auth_hash.info.name.split(" ").last
    avatar_url = process_uri(auth_hash.info.image)
    avatar = URI.parse(avatar_url)
    email = auth_hash.info.name.gsub(" ", ".").downcase + "@facebook.com"

    User.create(
      provider: provider,
      uid: uid,
      email: email,
      password: SecureRandom::urlsafe_base64,
      avatar: avatar,
      fname: fname,
      lname: lname
    )
  end

  def self.find_by_credentials(email, password)
   user = User.find_by_email(email)
   return nil unless user && user.is_password?(password)
   user
  end

  def self.process_uri(uri)
    require 'open-uri'
    require 'open_uri_redirections'
    open(uri, :allow_redirections => :safe) do |r|
      r.base_uri.to_s
    end
  end

end
