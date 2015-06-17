::TopicsController

class ::TopicsController

  def add_feedback
    topic = Topic.find(params['topic_id'])
    topic.add_feedback('TEST', current_user.id)
    topic.save

    render nothing: true
  end
end
