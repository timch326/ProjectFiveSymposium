(function () {

  var feedbackOptions = [
    {
      id: 'helpful-science',
      title: "Useful Scientific Question",
      description: 'This question addresses some basic scientific knowledge.',
      styleClasses: 'fa fa-flask'
    },
    {
      id: 'helpful-family',
      title: 'Useful for Understanding Family and Patient Perspectives',
      description: 'This question helps readers understand the perspective of family and patients.',
      styleClasses: 'fa fa-users'
    },
    {
      id: 'helpful-professional',
      title: 'Useful Interprofessional and Health System Question',
      description: 'This questions improves understanding of interprofessional and health care system relationships.',
      styleClasses: 'fa fa-user-md'
    },
    {
      id: 'outstanding',
      title: 'Outstanding Question',
      description: 'This question is very well thought.',
      styleClasses: 'fa fa-star'
    }
  ];

  Discourse.FeedbackButton = Discourse.DropdownButtonComponent.extend({
    text: "<i class='fa fa-comment'></i> " +
    "Feedback" +
    "<span class='caret'></span>",
    title: 'Provide some feedback to the posted question',

    clicked: function (feedbackType) {
      var topic = this.get('topic');
      topic.toggleFeedback(feedbackType)
        .then(function (response) {
          console.log(response);
          topic.set('feedback', response.feedback);
          topic.set('feedback_votes', response.feedback_votes);

          var feedbackResults = topic.get('feedbackResults');

          for (var i = 0; i < feedbackResults.length; i++) {
            if (topic.feedback) {
              var votes = topic.feedback['feedback_' + feedbackResults[i].id];
            }
            topic.set('feedbackResults.' + i + '.votes', votes || 0);
          }
        });
    },

    dropDownContent: function () {
      return feedbackOptions;
    }.property()
  });

  Discourse.Topic.reopen({
    feedbackResults: function () {
      for (var i = 0; i < feedbackOptions.length; i++) {
        if (this.feedback) {
          var votes = this.feedback['feedback_' + feedbackOptions[i].id];
        }
        feedbackOptions[i].votes = votes || 0;
      }
      return feedbackOptions;
    }.property()
  });

  Discourse.TopicFooterButtonsView.reopen({
    addFeedbackButton: function () {
      var topic = this.get('topic');
      const viewArgs = {topic: topic};
      this.attachViewWithArgs(viewArgs, Discourse.FeedbackButton);
    }.on("additionalButtons")
  });
})();
