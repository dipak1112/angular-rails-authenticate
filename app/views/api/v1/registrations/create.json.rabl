object @user
attributes :firstname, :lastname, :username, :email

glue @auth_token do
  attributes :auth_token
end