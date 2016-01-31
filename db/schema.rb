# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160131010856) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string   "name",                                   null: false
    t.string   "institution_id",                         null: false
    t.string   "user_id",                                null: false
    t.decimal  "balance",        precision: 8, scale: 2, null: false
    t.string   "account_type",                           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "accounts", ["institution_id"], name: "index_accounts_on_institution_id", using: :btree
  add_index "accounts", ["user_id"], name: "index_accounts_on_user_id", using: :btree

  create_table "institutions", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "url"
    t.string   "logo_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "institutions", ["name"], name: "index_institutions_on_name", unique: true, using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "transactions", force: :cascade do |t|
    t.integer  "account_id",                                                    null: false
    t.decimal  "amount",      precision: 8, scale: 2,                           null: false
    t.text     "notes"
    t.datetime "date",                                                          null: false
    t.boolean  "is_private?",                         default: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.string   "category",                            default: "UNCATEGORIZED"
  end

  add_index "transactions", ["account_id"], name: "index_transactions_on_account_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "fname"
    t.string   "lname"
    t.string   "gender"
    t.string   "age"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
