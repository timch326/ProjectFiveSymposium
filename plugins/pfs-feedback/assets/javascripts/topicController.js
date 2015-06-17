Discourse.TopicController.reopen({
  addFeedback: function(feedbackType, userId) {
    this.get('content').addFeedback(feedbackType, userId);
  }
});
