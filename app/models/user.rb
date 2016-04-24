class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable,:registerable,
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable#, :token_authenticatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body
  before_save :ensure_authentication_token

  def ensure_authentication_token
    self.authentication_token = '133432423432423sdfs4343'
  end

end
