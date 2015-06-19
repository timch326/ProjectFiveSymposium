export default Ember.Component.extend({
  tagName: 'div',

  _init: function(){
    this.$("input").select2({
        multiple: true,
        width: '100%',
        query: function(opts) {
                opts.callback({ results: this.site.get("categories").map(this._format) });
              }.bind(this)
      }).on("change", function(evt) {
        if (evt.added){
          console.log("at add event", this.site);
          this.groupAdded("test");
          this.triggerAction({
            action: "groupAdded",
            actionContext: this.site.get("categories").findBy("id", evt.added.id)
          });
        } else if (evt.removed) {
          this.triggerAction({
            action:"groupRemoved",
            actionContext: evt.removed.id
          });
        }
      }.bind(this));

    this._refreshOnReset();
  }.on("didInsertElement"),

  _format(item) {
    return {
      "text": item.name,
      "id": item.id
    };
  },

  _refreshOnReset: function() {
    this.$("input").select2("data", this.site.get("categories").map(this._format));
  }.observes("categories")
});
