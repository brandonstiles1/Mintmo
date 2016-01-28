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
student_loans = Institution.create!(
  name: "National Student Loan Database System",
  url: "https://www.nslds.ed.gov/nslds/nslds_SA/",
  logo_url: "https://www.nslds.ed.gov/nslds/nslds_SA/images/nslds/misc/FSA_Logo_Left.gif"
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

student_loans = Account.create!(
  name: "DIRECT STAFFORD SUBSIDIZED",
  institution_id: student_loans.id,
  user_id: u1.id,
  balance: -13486.24,
  account_type: "Loans"
)

Category.destroy_all
cat1 = Category.create(name: "UNCATEGORIZED")
cat2 = Category.create(name: "Education")
cat3 = Category.create(name: "Financial")
cat4 = Category.create(name: "Travel")
cat5 = Category.create(name: "Tryina Get It")

Transaction.destroy_all
t1 = Transaction.create!(
  account_id: cs_checking.id,
  amount: 1595.36,
  description: "Paycheck",
  date: "Tue, 26 Jan 2016 19:42:16 UTC +00:00",
  category_id: cat1.id
)

t2 = Transaction.create!(
  account_id: cs_checking.id,
  amount: -500.10,
  description: "Rent",
  date: "Wed, 27 Jan 2016 19:42:16 UTC +00:00",
  category_id: cat1.id
)


t3 = Transaction.create!(
  account_id: cs_checking.id,
  amount: -64.75,
  description: "Tinder Date",
  date: "Wed, 27 Jan 2016 15:42:16 UTC +00:00",
  category_id: cat5.id
)

t4 = Transaction.create!(
  account_id: cs_checking.id,
  amount: 200.00,
  description: "Passing Go in Monopoly",
  date: "Wed, 27 Jan 2016 18:42:16 UTC +00:00",
  category_id: cat4.id
)

t5 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 19.95,
  description: "Stupid shit on eBay",
  date: "Wed, 27 Jan 2016 15:34:16 UTC +00:00",
  category_id: cat3.id
)

t6 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 386.45,
  description: "Blah blahhhh",
  date: "Wed, 27 Jan 2016 16:42:16 UTC +00:00",
  category_id: cat1.id
)

t7 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 69.69,
  description: "Wink wink wink",
  date: "Wed, 27 Jan 2016 10:42:16 UTC +00:00",
  category_id: cat5.id
)

t8 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 69.69,
  description: "Wink wink wink",
  date: "Wed, 27 Jan 2016 10:42:16 UTC +00:00",
  category_id: cat5.id
)

t9 = Transaction.create!(
  account_id: student_loans.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 11:42:16 UTC +00:00",
  category_id: cat2.id
)

t10 = Transaction.create!(
  account_id: student_loans.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 12:42:16 UTC +00:00",
  category_id: cat2.id
)

t11 = Transaction.create!(
  account_id: student_loans.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category_id: cat2.id
)
