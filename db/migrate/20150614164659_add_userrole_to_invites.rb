class AddUserroleToInvites < ActiveRecord::Migration
  def change
    add_column :invites, :user_role, :string

    Invite.reset_column_information



     execute "update invites set user_role = 'student';" 

	

   
    change_column :invites, :user_role, :string, :null => false
  end
end
