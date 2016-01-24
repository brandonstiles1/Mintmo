# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
fname           | string    | not null, indexed, unique
lname           | string    | not null, indexed, unique
age             | string    | not null, indexed, unique

## institutions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
url         | string    | not null
logo        | string    | not null

## categories
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
name           | string    | not null, indexed

## tags
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
name           | string    | not null, indexed

## accounts
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
name           | string    | not null, indexed
institution_id | integer   | not null, foreign key (ref: institutions), index
user_id        | integer   | not null, foreign key (ref: users), index
balance        | decimal   | not null
account_type   | string    | not null, inclusion in specified acct types, index

## taggings (join table)
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
transaction_id | integer   | not null, foreign key (ref: tags) indexed
tag_id         | integer   | not null, foreign key (ref: transaction) indexed

## transactions_category (join table)
column name     | data type | details
----------------|-----------|--------------------
id              | integer   | not null, primary key
trasaction_id   | integer   | not null, uniq, foreign key (ref: transactions), index
category_id     | integer   | not null, foreign key (ref: category), index


## transactions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
account_id  | integer   | not null, foreign key (ref: account), index
amount      | decimal   | not null
description | string    | not null
notes       | text      |
date        | datetime  | not null
is_private  | boolean   | not null, default: true

## followings (join table)
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
follower_id    | integer   | not null, foreign key (ref: user), index
followee_id    | integer   | not null, foreign key (ref: user), index

## likes (join table)
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
transaction_id | integer   | not null, foreign key (ref: transactions), index
liker_id       | integer   | not null, foreign key (ref: user), index

## comments (join table)
column name    | data type | details
---------------|-----------|--------------------
id             | integer   | not null, primary key
transaction_id | integer   | not null, foreign key (ref: transactions), index
commenter_id   | integer   | not null, foreign key (ref: user), index
