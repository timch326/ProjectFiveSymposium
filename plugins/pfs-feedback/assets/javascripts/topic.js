Discourse.Topic.reopen({
  toggleFeedback: function(feedbackType) {
      var topic = this;

      return Discourse.ajax({
      url: this.get('url') + '/toggle_feedback',
      type: 'PUT',
      data: { feedback_type: feedbackType}
    }).then(function (response) {
        console.log(response);
        topic.set('feedback', response.feedback);
        topic.set('feedback_votes', response.feedback_votes);
    });
  }
});
