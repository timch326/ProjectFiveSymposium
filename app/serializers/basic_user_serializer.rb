class BasicUserSerializer < ApplicationSerializer
  attributes :id, :username, :uploaded_avatar_id, :avatar_template, :user_role

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

  def user_role
    user.user_role
  end

end
