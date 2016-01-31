json.extract! @user, :id, :email, :fname, :lname, :age, :gender, :avatar
json.image_url asset_path(@user.avatar.url)
