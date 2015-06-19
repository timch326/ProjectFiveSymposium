Discourse.Topic.reopen({
  toggleFeedback: function(feedbackType) {
      return Discourse.ajax({
      url: this.get('url') + '/toggle_feedback',
      type: 'PUT',
      data: { feedback_type: feedbackType}
    });
  }
});
