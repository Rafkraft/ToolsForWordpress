
var CommentsCollection= Backbone.Collection.extend({
        initialize: function(models, options) {
            _.extend (this, _.pick('url'));
        },
});

var CommentView = Backbone.Marionette.ItemView.extend({
    initialize:function(){

        //declaring model to simplify access to it
        var model = this.model.attributes;
        this.templateHelpers = {};

        //template helpers
        this.templateHelpers.author=model.author;
        this.templateHelpers.date=model.date;
        this.templateHelpers.content=model.content;
    },
    tagName:"div",  
    template : "#boxCommentsTemplate"
})

var CommentsCollectionView= Backbone.Marionette.CollectionView.extend({
    childView: CommentView
});

