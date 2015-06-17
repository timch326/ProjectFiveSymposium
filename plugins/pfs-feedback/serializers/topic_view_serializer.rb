::TopicViewSerializer

class ::TopicViewSerializer
  attributes :feedback

  def feedback
    object.topic.feedback.to_i
  end
end
