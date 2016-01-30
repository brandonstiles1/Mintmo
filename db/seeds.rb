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
student_Loan = Institution.create!(
  name: "National Student Loan Database System",
  url: "https://www.nslds.ed.gov/nslds/nslds_SA/",
  logo_url: "https://www.nslds.ed.gov/nslds/nslds_SA/images/nslds/misc/FSA_Logo_Left.gif"
)

paypal = Institution.create!(
  name: "Paypal",
  url: "https://www.paypal.com/home",
  logo_url: "https://www.paypalobjects.com/webstatic/icon/pp258.png"
)

capital_one = Institution.create!(
  name: "Capital One",
  url: "https://www.capitalone.com/",
  logo_url: "https://media.cofstatic.com/assets/rwd/img/logo/capitalone-logo-2x-oasis.png"
)

fidelity = Institution.create!(
  name: "Fidelity Investments",
  url: "https://www.fidelity.com/",
  logo_url: "http://2013.pytexas.org/media/cms/10/fidelity_2012.png"
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

loan1 = Account.create!(
  name: "DIRECT STAFFORD SUBSIDIZED",
  institution_id: student_Loan.id,
  user_id: u1.id,
  balance: -13486.24,
  account_type: "Loan"
)

loan2 = Account.create!(
  name: "DIRECT STAFFORD UNSUBSIDIZED",
  institution_id: student_Loan.id,
  user_id: u1.id,
  balance: -15486.24,
  account_type: "Loan"
)

credit_card1 = Account.create!(
  name: "Capital One Venture One",
  institution_id: capital_one.id,
  user_id: u1.id,
  balance: -116.25,
  account_type: "Credit Cards"
)

investment1 = Account.create!(
  name: "Fidelity 401(k)",
  institution_id: fidelity.id,
  user_id: u1.id,
  balance: 12653.25,
  account_type: "Investments"
)


Transaction.destroy_all
t1 = Transaction.create!(
  account_id: cs_checking.id,
  amount: 1595.36,
  description: "Paycheck",
  date: "Tue, 26 Jan 2016 19:42:16 UTC +00:00",
)

t2 = Transaction.create!(
  account_id: cs_checking.id,
  amount: -500.10,
  description: "Rent",
  date: "Wed, 27 Jan 2016 19:42:16 UTC +00:00",
)


t3 = Transaction.create!(
  account_id: cs_checking.id,
  amount: -64.75,
  description: "Tinder Date",
  date: "Wed, 27 Jan 2016 15:42:16 UTC +00:00",
  category: "Tryina Get It"
)

t4 = Transaction.create!(
  account_id: cs_checking.id,
  amount: 200.00,
  description: "Passing Go in Monopoly",
  date: "Wed, 27 Jan 2016 18:42:16 UTC +00:00",
  category: "Travel"
)

t5 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 19.95,
  description: "Stupid shit on eBay",
  date: "Wed, 27 Jan 2016 15:34:16 UTC +00:00",
  category: "Financial"
)

t6 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 386.45,
  description: "Blah blahhhh",
  date: "Wed, 27 Jan 2016 16:42:16 UTC +00:00",
)

t7 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 69.69,
  description: "Wink wink wink",
  date: "Wed, 27 Jan 2016 10:42:16 UTC +00:00",
  category: "Tryina Get It"
)

t8 = Transaction.create!(
  account_id: paypal_checking.id,
  amount: 69.69,
  description: "Wink wink wink",
  date: "Wed, 27 Jan 2016 10:42:16 UTC +00:00",
  category: "Tryina Get It"
)

t9 = Transaction.create!(
  account_id: loan1.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 11:42:16 UTC +00:00",
  category: "Education"
)

t10 = Transaction.create!(
  account_id: loan1.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 12:42:16 UTC +00:00",
  category: "Education"
)

t11 = Transaction.create!(
  account_id: loan1.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Education"
)

t12 = Transaction.create!(
  account_id: loan2.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 12:42:16 UTC +00:00",
  category: "Education"
)

t13 = Transaction.create!(
  account_id: loan2.id,
  amount: 340.69,
  description: "Student Loan Payment",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Education"
)

t14 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

t15 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

t16 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

t17 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

t18 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

t19 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

t20 = Transaction.create!(
  account_id: investment1.id,
  amount: 500.00,
  description: "401(k) Contribution",
  date: "Wed, 27 Jan 2016 13:42:16 UTC +00:00",
  category: "Retirement"
)

cs_checking.create_transactions(20)
credit_card1.create_transactions(20)
paypal_checking.create_transactions(20)
