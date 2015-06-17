Discourse.Topic.reopen({
  addFeedback: function(feedbackType, userId) {
    var topic = this;

    return Discourse.ajax({
      url: this.get('url') + '/add_feedback',
      type: 'PUT',
      data: { feedback_type: feedbackType,
              user_id : userId}
    }).then(function () {
      var feedbackCount = topic.get('feedback') || 0;
      topic.set('feedback', feedbackCount + 1);
      console.log(topic.feedback);
    });
  }
});
