(function () {
  Discourse.FeedbackButton = Discourse.DropdownButtonComponent.extend({
    text: "<i class='fa fa-comment'></i> " +
    "Feedback" +
    "<span class='caret'></span>",
    title: 'Provide some feedback to the posted question',

    clicked: function () {
      console.log(this.get('topic'));
      alert(this.get('topic.title'));
    },

    dropDownContent: function () {
      return [
        {
          id: 'helpful-science',
          title: "Useful Scientific Question",
          description: 'Insert some interesting description here',
          styleClasses: 'fa fa-flask'
        },
        {
          id: 'helpful-family',
          title: 'Useful for Understanding Family and Patient Perspectives',
          description: 'Note that this is hardcoded and not using the internationalization components',
          styleClasses: 'fa fa-users'
        },
        {
          id: 'helpful-professional',
          title: 'Useful Interprofessional and Health System Question',
          description: 'Note that this is hardcoded and not using the internationalization components',
          styleClasses: 'fa fa-user-md'
        },
        {
          id: 'outstanding',
          title: 'Outstanding Question',
          description: 'Note that this is hardcoded and not using the internationalization components',
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
