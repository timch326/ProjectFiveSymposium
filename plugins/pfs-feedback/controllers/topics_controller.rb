::TopicsController

class ::TopicsController

  def toggle_feedback
    topic = Topic.find(params['topic_id'])
    topic.toggle_feedback(params['feedback_type'], current_user.id)
    topic.save

    render json: {feedback: topic.feedback, feedback_votes: topic.feedback_votes(current_user.id)}
  end
end
