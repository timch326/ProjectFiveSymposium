class AddUserroleToInvites < ActiveRecord::Migration
  def change
    add_column :invites, :user_role, :string

    Invite.reset_column_information

    Invite.all.each do |invite|
     invite.user_role = "super_admin"
     invite.save!
   	end

   change_column :invites, :user_role, :string, :null => false
  end
end
