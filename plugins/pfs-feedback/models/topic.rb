class ::Topic

  def toggle_feedback(feedback_type, user_id)
    feedback = self.meta_data[PfsFeedbackFields::FEEDBACK] || {}
    user_votes = self.meta_data["#{PfsFeedbackFields::VOTES}-#{user_id}"] || {}

    if has_voted?(feedback_type, user_votes)
      remove_feedback(feedback, feedback_type, user_votes)
    else
      add_feedback(feedback, feedback_type, user_votes)
    end

    self.meta_data[PfsFeedbackFields::FEEDBACK] = feedback
    self.meta_data["#{PfsFeedbackFields::VOTES}-#{user_id}"] = user_votes
    self.save_custom_fields(true)
  end

  def has_voted?(feedback_type, user_votes)
    selected_feedback = user_votes['selected_feedback'] || []
    selected_feedback.include?(feedback_type)
  end

  def add_feedback(feedback, feedback_type, user_votes)
    feedback_count = feedback["feedback_#{feedback_type}"] || 0
    feedback["feedback_#{feedback_type}"] = feedback_count + 1
    record_vote(feedback, feedback_type, user_votes)
  end

  def remove_feedback(feedback, feedback_type, user_votes)
    feedback_count = feedback["feedback_#{feedback_type}"]
    feedback["feedback_#{feedback_type}"] = feedback_count - 1
    remove_vote(feedback, feedback_type, user_votes)
  end

  def record_vote(feedback, feedback_type, user_votes)
    unless user_votes['selected_feedback'] && user_votes['selected_feedback'].size()
      voter_count = feedback['voter_count'] || 0
      feedback['voter_count'] = voter_count + 1
    end

    selected_feedback = user_votes['selected_feedback'] || []
    user_votes['selected_feedback'] = selected_feedback.push(feedback_type)
  end

  def remove_vote(feedback, feedback_type, user_votes)
    selected_feedback = user_votes['selected_feedback']
    user_votes['selected_feedback'] = selected_feedback - [feedback_type]

    unless user_votes['selected_feedback'] && user_votes['selected_feedback'].size()
      feedback['voter_count'] = feedback['voter_count'] - 1
    end
  end

  def feedback
    self.meta_data[PfsFeedbackFields::FEEDBACK]
  end

  def feedback_votes(user_id)
    self.meta_data["#{PfsFeedbackFields::VOTES}-#{user_id}"]
  end
end
