class ::Topic


  def add_feedback(feedback_type, user_id)
    feedback_count = self.meta_data[PfsFeedbackConstants::FEEDBACK_CUSTOM_FIELD].to_i || 0
    puts 'FEEDBACK'
    puts self.meta_data[PfsFeedbackConstants::FEEDBACK_CUSTOM_FIELD]
    self.meta_data[PfsFeedbackConstants::FEEDBACK_CUSTOM_FIELD] = feedback_count + 1
  end

  def feedback
    self.meta_data[PfsFeedbackConstants::FEEDBACK_CUSTOM_FIELD]
  end
end
