# name: pfs-feedback
# about: experimental feedback system
# version: 0.1

register_asset "javascripts/pfs-feedback.js"
register_asset "javascripts/topic.js"

Discourse::Application.routes.append do
  put "t/:slug/:topic_id/toggle_feedback" => "topics#toggle_feedback", constraints: {topic_id: /\d+/}
end

after_initialize do
  load File.expand_path("../pfs_feedback_fields.rb", __FILE__)
  load File.expand_path("../controllers/topics_controller.rb", __FILE__)
  load File.expand_path("../models/topic.rb", __FILE__)

  Topic.register_custom_field_type(PfsFeedbackFields::FEEDBACK, :json)
  Topic.register_custom_field_type("#{PfsFeedbackFields::VOTES}-*", :json)

  class ::TopicViewSerializer
    attributes :feedback, :feedback_votes

    def feedback
      object.topic.feedback
    end

    def topic_view_custom_fields
      @topic_view_custom_fields ||= object.topic.custom_fields
    end
  end

  add_to_serializer(:topicView, :feedback) {topic_view_custom_fields[PfsFeedbackFields::FEEDBACK]}
  add_to_serializer(:topicView, :feedback_votes) {topic_view_custom_fields["#{PfsFeedbackFields::VOTES}-#{scope.user.id}"]}
end
