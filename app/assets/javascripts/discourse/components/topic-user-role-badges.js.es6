import StringBuffer from 'discourse/mixins/string-buffer';

// Creates a link
function link(buffer, title, url, cssClass) {

  buffer.push("<a href='" + url + "' class='user_role " + cssClass+ "' title='" + title + "'>" + title + "</a>\n");
}

export default Ember.Component.extend(StringBuffer, {
  tagName: 'span',
  classNameBindings: [':topic-user-role-badges'],
  rerenderTriggers: ['url'],

  renderString: function(buffer) {
    var url = this.get('url');
    var userRole = this.get('userRole')
    var title = I18n.t("topic.user_roles." + userRole);
    if (userRole === "super_admin") {
      title = "Admin";
    }
    link(buffer, title + 'Post', url, userRole);
  }
});
