const PosterNameComponent = Em.Component.extend({
  classNames: ['names', 'trigger-user-card'],
  displayNameOnPosts: Discourse.computed.setting('display_name_on_posts'),

  // sanitize name for comparison
  sanitizeName(name){
    return name.toLowerCase().replace(/[\s_-]/g,'');
  },

  render(buffer) {
    const post = this.get('post');

    if (post) {
      const username = post.get('username'),
            primaryGroupName = post.get('primary_group_name'),
            url = post.get('usernameUrl');

      var linkClass = 'username',
          name = post.get('name');

      // linkClass += ' ' + post.get('user_role');

      if (!Em.isEmpty(primaryGroupName)) {
        linkClass += ' ' + primaryGroupName;
      }
      // Main link
      buffer.push("<span class='" + linkClass + "'><a href='" + url + "' data-auto-route='true' data-user-card='" + username + "'>" + username + "</a>");

      // Add a glyph if we have one
      const glyph = this.posterGlyph(post);
      if (!Em.isEmpty(glyph)) {
        buffer.push(glyph);
      }
      buffer.push("</span>");

      // Are we showing full names?
      if (name && this.get('displayNameOnPosts') && (this.sanitizeName(name) !== this.sanitizeName(username))) {
        name = Handlebars.Utils.escapeExpression(name);
        buffer.push("<span class='full-name'><a href='" + url + "' data-auto-route='true' data-user-card='" + username  + "'>" + name + "</a></span>");
      }

      // User titles
      let title = post.get('user_title');
      if (!Em.isEmpty(title)) {

        title = Handlebars.Utils.escapeExpression(title);
        buffer.push('<span class="user-title">');
        if (Em.isEmpty(primaryGroupName)) {
          buffer.push(title);
        } else {
          buffer.push("<a href='/groups/" + post.get('primary_group_name') + "' class='user-group'>" + title + "</a>");
        }
        buffer.push("</span>")
      }

      var userRole = post.get('user_role');
      buffer.push("<span><a class='user_role  " + userRole + "' title='" + I18n.t('topic.user_roles.' + userRole) + " Post'>" + I18n.t('topic.user_roles.' + userRole) + "</a></span>");

      PosterNameComponent.trigger('renderedName', buffer, post);
    }
  },

  //  Overwrite this to give a user a custom font awesome glyph.
  posterGlyph(post) {
    if(post.get('moderator')) {
      const desc = I18n.t('user.moderator_tooltip');
      return '<i class="fa fa-shield" title="' + desc +  '" alt="' + desc + '"></i>';
    }
  }
});

// Support for event triggering
PosterNameComponent.reopenClass(Em.Evented);

export default PosterNameComponent;
