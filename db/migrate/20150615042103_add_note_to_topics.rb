class AddNoteToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :note, :boolean


    Topic.reset_column_information

    Topic.all.each do |topic|
      topic.update_attributes(:note => false)
    end

    change_column_default :topics, :note, false
    change_column :topics, :note, :boolean, :null => false
  end
end
