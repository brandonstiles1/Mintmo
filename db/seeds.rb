# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
u1 = User.create!(email: "test@test.com",
  password_digest: "$2a$10$2AZmMQpgZpanh5yC1bCIYOcW6HLLklvLRxqSrTSvlk6T63R8Nr.e.",
  fname: "Test",
  lname: "Tester",
  age: 16)
