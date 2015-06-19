class AddUserroleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_role, :string

	User.reset_column_information
 
    User.all.each do |u|
      u.user_role = "super_admin"
      u.save!
    end
 

  end
end
