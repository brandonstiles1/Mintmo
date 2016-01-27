# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
u1 = User.create!(
  email: "test@test.com",
  password_digest: "$2a$10$2AZmMQpgZpanh5yC1bCIYOcW6HLLklvLRxqSrTSvlk6T63R8Nr.e."
)

Institution.destroy_all
charles_schwab = Institution.create!(
  name: "Charles Schwab",
  url: "https://www.schwab.com/",
  logo_url: "https://www.schwab.com/public/file/P-6040152/logo.png"
)

paypal = Institution.create!(
  name: "Paypal",
  url: "https://www.paypal.com/home",
  logo_url: "https://www.paypalobjects.com/webstatic/icon/pp258.png"
)


Account.destroy_all
cs_checking = Account.create!(
  name: "Charles Schwab Checking Account",
  institution_id: charles_schwab.id,
  user_id: u1.id,
  balance: 2000.00,
  account_type: "Cash"
)

paypal_checking = Account.create!(
  name: "Paypal Business Account",
  institution_id: paypal.id,
  user_id: u1.id,
  balance: 563.19,
  account_type: "Cash"
)
