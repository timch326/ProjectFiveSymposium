class BasicUserSerializer < ApplicationSerializer
  attributes :id, :username, :uploaded_avatar_id, :avatar_template, :admin, :moderator

  def include_name?
    SiteSetting.enable_names?
  end

  def avatar_template
    if Hash === object
      User.avatar_template(user[:username], user[:uploaded_avatar_id])
    else
      object.avatar_template
    end
  end

  def user
    object[:user] || object
  end

  def admin
    user.admin
  end

  def moderator
    user.moderator
  end

  # def staff
  #   user[:staff]
  # end

  # def admin
  #   user.
  # end

  # def moderator
  #   object[:moderator] || object
  # end
  

  # def admin
  #   puts "ARGHHHHHHadmin"
  #   puts object
  #   puts object.username
  #   puts User.new(object).admin
  #   if Hash === object
  #     User.admin?
  #   else
  #     object.admin?
  #   end
  # end

  # def moderator
  #   puts "ARGHHHHHHmod"
  #   puts object
  #   puts object.username
  #   puts User.new(object).moderator
  #   # puts User.moderator
  #   if Hash === object
  #     User.moderator?
  #   else
  #     true
  #   end
  # end

end
