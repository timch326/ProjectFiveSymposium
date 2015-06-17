(function () {
  Discourse.FeedbackButton = Discourse.DropdownButtonComponent.extend({
    text: "<i class='fa fa-comment'></i> " +
    "Feedback" +
    "<span class='caret'></span>",
    title: 'Provide some feedback to the posted question',

    clicked: function () {
      alert(this.get(topic.id));
      console.log(this.get('topic').id);
      this.get('topic').addFeedback('SOME TYPE', 'someid');
    },

    dropDownContent: function () {
      return [
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
