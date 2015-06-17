# name: pfs-feedback
# about: experimental feedback system
# version: 0.1

register_asset "javascripts/pfs-feedback.js"
register_asset "javascripts/topic.js"
register_asset "javascripts/topicController.js"

Discourse::Application.routes.append do
  put "t/:slug/:topic_id/add_feedback" => "topics#add_feedback", constraints: {topic_id: /\d+/}
end

# PLUGIN_NAME ||= "pfs-feedback".freeze
#
# FEEDBACKS_CUSTOM_FIELD ||= "feedbacks".freeze
# VOTES_CUSTOM_FIELD ||= "feedbacks-votes".freeze

after_initialize do
  load File.expand_path("../pfs_feedback_constants.rb", __FILE__)
  load File.expand_path("../controllers/topics_controller.rb", __FILE__)
  load File.expand_path("../models/topic.rb", __FILE__)
  load File.expand_path("../serializers/topic_view_serializer.rb", __FILE__)

  Topic.register_custom_field_type(PfsFeedbackConstants::FEEDBACK_CUSTOM_FIELD, :int)

  # module ::PfsFeedback
  #   class Engine < ::Rails::Engine
  #     engine_name PLUGIN_NAME
  #     isolate_namespace PfsFeedback
  #   end
  # end
  #
  # class PfsFeedback::Feedback
  #   class << self
  #
  #     def addFeedback(topic, feedback_type, user_id)
  #
  #     end
  #   end
  #
  # end
end
