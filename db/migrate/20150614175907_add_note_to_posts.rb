class AddNoteToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :note, :boolean

    Post.reset_column_information

    Post.all.each do |post|
      post.update_attributes(:note => false)
    end

    change_column_default :posts, :note, false
    change_column :posts, :note, :boolean, :null => false
  end
end
