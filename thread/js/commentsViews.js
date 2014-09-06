//Comments Logged view
var CommentsLoggedView = Backbone.Marionette.ItemView.extend({
    template: "#commentsLoggedTemplate",
    events:{
        "click .comment-reply-link":"inResponse",
        "click #sendComment":"sendComment"
    },
    initialize:function(options){
        this.templateHelpers={};
        this.templateHelpers.data=this.model.get('comments');
    },
    onRender:function(){
        $('body .commentsLink').remove();
        $("#charging").css('display','none');
        
        var location = window.location.hash;
        var location = location.replace('/comments','');
        $(this.el).prepend('<span class="articleLink"><a href="'+location+'">Article</a></span>');

        var as=$(this.el).find('#commentsSection').find('a')
        $(as).removeAttr('href');
        $(as).removeAttr('onclick');
        $(this.el).find('.comment-metadata').remove();
        if(window.wordpressInfos.userLogged){
            $(as).html('Répondre');
        }else{
            $(as).html('');
            $(as).attr('style',"display:none")
        }

        setTimeout(function(){
            var li = $('#commentsSection').find('li');
            var author = $(li[0]).find('.fn').html();
            if(author=="raf"){
                $(li[0]).css('display','none');
            }
        },100)

        setTimeout(function(){
            var li = $('#commentsSection').find('li');
            var author = $(li[0]).find('.fn').html();
            if(author=="raf"){
                $(li[0]).css('display','none');
            }
        },500)





    },
    inResponse:function(e){
        var parentId=$(e.currentTarget).parent().parent().parent().attr('id');
        var id = parentId.replace( /^\D+/g, '')
        console.log(id);
        $('#inResponse').val(id);
    },
    sendComment:function(){
        var data = {
            "author":window.wordpressInfos.userLogin,
            "email":window.wordpressInfos.mail,
            "comment":$("#commentContent").val(),
            "comment_post_ID":this.model.get('pageID'),
            "comment_parent":$('#inResponse').val()
        };
        $.ajax({
              type: "POST",
              url: "../wp-comments-post.php",
              data: data,
              success: function(result) {
                setTimeout(function(){
                        location.reload();
                }, 500);
              },
              dataType: "text"
        });
    }
});

//Comments Not Logged view
var CommentsNotLoggedView = Backbone.Marionette.ItemView.extend({
    template: "#commentsNotLoggedTemplate",
    initialize:function(options){
        this.templateHelpers={};
        this.templateHelpers.data=this.model.get('comments');
    },
    onRender:function(){
        $('body .commentsLink').remove();
        $("#charging").css('display','none');


        var location = window.location.hash;
        var location = location.replace('/comments','');
        $(this.el).prepend('<span class="articleLink"><a href="'+location+'">Article</a></span>');

        var as=$(this.el).find('#commentsSection').find('a')
        $(as).removeAttr('href');
        $(as).removeAttr('onclick');
        $(this.el).find('.comment-metadata').remove();
        if(window.wordpressInfos.userLogged){
            $(as).html('Répondre');
        }else{
            $(as).html('');
            $(as).attr('style',"display:none")
        }
    }
});