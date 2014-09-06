var BoxView = Backbone.Marionette.ItemView.extend({
    template: "#boxVideoTemplate",
    tagName:"div", 
    events: {
    "click #random":"random",
    "click .part": "part",
    "click #sendComment":"sendComment",
    "click .close":"close",
    "click #refresh":"loadComments",
    "click #refresh":"loadThumbs",
    "click .thumb":"addThumb",
    "click .tag":"search"
    },
    initialize:function(options){
        this.options = options;

        //If model exist
        if(typeof this.model!=="undefined"){
            var model = this.model.attributes;
            window.currentCollection = this.model.collection;
            this.templateHelpers = {};

            this.templateHelpers.title = model.titre;
            this.templateHelpers.url = model.parts[0];

            //Tags
            var tags ='';
            if(model.tags.length>0){
                $.each(model.tags,function(index,value){
                    tags+='<span class="tag">'+value+'</span>';
                })
            }
            this.templateHelpers.tags = tags;

            //Names
            var names=''
            $.each(model.nom,function(index,value){
                names+='<span class="tag">'+value+'</span>';
            })
            this.templateHelpers.names = names;

            //Parts
            var parts=''
            if(model.parts.length>1){
                $.each(model.parts,function(index,value){
                    index = parseInt(index);
                    index=index+1;
                    parts+='<span class="part" url="'+value+'">'+'Part '+index+'</span>';
                })
            }
            this.templateHelpers.parts = parts;

            //Iframe depending on the platforme
            if(model.plateforme=='youtube'){
                this.templateHelpers.url="//www.youtube.com/embed/"+model.parts[0]+"?version=3&amp;hl=fr_FR&amp;rel=0"
            }else if(model.plateforme=='dailymotion'){
                this.templateHelpers.url="//www.dailymotion.com/embed/video/"+model.parts[0];
            }else if(model.plateforme=='vimeo'){
                this.templateHelpers.url="//player.vimeo.com/video/"+model.parts[0]+"?portrait=0&color=78F";
            }
            this.templateHelpers.error="";

        //If model doesn't exist
        }else{            
            this.templateHelpers = {};
            this.templateHelpers.error="<h3>This video doesn't exist, maybe the administrator deleted it, or maybe you entered a wrong id/collection name.</h3>";
            this.templateHelpers.title = "";
            this.templateHelpers.url = "";
            this.templateHelpers.tags = "";
            this.templateHelpers.names = "";
            this.templateHelpers.parts = "";
            this.templateHelpers.url = "";
        }
    },
    onRender:function(){
       
        $('.video>.part:first-of-type').addClass('active_part');
        $('#path').css('display','block');
        $( "#path" ).animate({opacity: 1}, 400, function() {
            $( "#box, #comment_form, #comments" ).animate({opacity: 1}, 400);
        });
        if(typeof this.model!=="undefined"){
            $('.error').css('opacity',0);
            $('.subtitle').css('opacity',1);
        }else{
            $('#box>h3').css('opacity',1);
            $('.subtitle').css('opacity',0);
        }
        this.loadComments();
        this.loadThumbs();
    },
    random:function(){
        var random=0;
        while(random==this.model.get('id')){
            random = parseInt(Math.random()*this.model.collection.length);
        }
        
        var name = this.model.collection.infos.name;
        $( "#box, #comment_form, #comments" ).animate({opacity: 0}, 300,function(){
            window.location.href = '#page/'+name+'/'+random;
        });
    },
    part:function(e){
        var url = $(e.target).attr('url');
        //Edit url depending on platform
        if(this.model.attributes.plateforme=='youtube'){
            url="//www.youtube.com/embed/"+url+"?version=3&amp;hl=fr_FR&amp;rel=0"
        }else if(model.plateforme=='dailymotion'){
            url="//www.dailymotion.com/embed/video/"+url;
        }else if(model.plateforme=='vimeo'){
            url="//player.vimeo.com/video/"+url+"?portrait=0&color=78F";
        }
        $('.video>iframe').attr('src',url);
        $('.part').removeClass('active_part');
        $(e.target).addClass('active_part');
    },
    search:function(e){
        var tag = $(e.target).html();
        $('#searchInput').val(tag);
    },
    close:function(){
        $('.video').html('');
         $( "#box, #comment_form, #comments" ).animate({opacity: 0}, 300, function() {
            $( "#path" ).animate({opacity: 0}, 300,function(){
                $('#path').css('display','none');
                window.location.href = '#page/'+window['currentCollection'].infos.name;
            });
        });
    },
    loadComments: function(id){
        console.log('loadcomments');
        var id = this.model.get('id');
        var comment = $('#comment_field').val();
        var page = this.options.infos.name;

        var url = page+"/comments/"+id+".json";
        commentsCollection = new CommentsCollection([],{url:url});
        commentsCollection.url = url;
        
        commentsCollection.fetch().done(function(){
        boxLayoutView.comments.show(new CommentsCollectionView({
                        collection:commentsCollection
                    }));
        });
    },
    sendComment:function(){
        $('#allErrors').html('');
        console.log('sendcomments');
        var id = this.model.get('id');
        var comment = $('#comment_field').val();
        var page = this.options.infos.name;
        var data = {'id':id,'comment':comment,'page':page};   
        $.ajax({
            type: "POST",
            url: page+"/comments/addComment.php",
            data: data,
            dataType: "text",
            success: function(data) {
                //console.log(data);
                $('#comment_field').val('');
                data = $.parseHTML(data);

                var errors = $(data).filter(".error").html();
                $('#allErrors').html(errors);

                if($('#allErrors').html().length>3){
                    $('#allErrors').css('display','block');
                }else{
                    $('#allErrors').css('display','none');
                }
            }
        });
    },
    loadThumbs: function(id){
        $('#allErrors').html('');
        $.ajaxSetup({ cache: false });
        var id = this.model.get('id');
        var page = this.options.infos.name;
        var url = page+"/thumbs/thumbsList.json";
        $.ajax({
            url : url,
            dataType: "text",
            success : function (data) {
                data = jQuery.parseJSON(data);
                //console.log(data);
                var down=0;
                var up=0;
                $('#thumbs').find('span').remove();
                if(data[id]){
                    for(var i = 0; i < data[id].length; i++) {
                        if(data[id][i].thumbs == 'true'){
                            up+=1;

                        }else{
                            down+=1;
                        }
                    };
                    $('#thumbsup').after('<span>'+up+'</span>');
                    $('#thumbsdown').after('<span>'+down+'</span>');
                    
                }else{
                    $('#thumbsup').after('<span>0</span>');
                    $('#thumbsdown').after('<span>0</span>');
                }       
            }
        });
    },
    addThumb: function(ev){

        var that=this;
        $('#allErrors').html('');
        var thumb = $(ev.target).attr('thumb');
        var id = this.model.get('id');
        var page = this.options.infos.name;

        var url = page+"/thumbs/";
        var data = {'thumb':thumb,'id':id,'page':page};
       
        $.ajax({
            type: "POST",
            url: page+"/thumbs/addThumbs.php",
            data: data,
            dataType: "text",
            success: function(data) {
                //console.log(data);
                data = $.parseHTML(data);
                var errors = $(data).filter(".error").html();
                $('#allErrors').html(errors);
                if($('#allErrors').html().length>3){
                    $('#allErrors').css('display','block');
                }else{
                    $('#allErrors').css('display','none');
                }
                that.loadThumbs();
            }
        });
    }
});

var BoxLayoutView = Backbone.Marionette.LayoutView.extend({
    template: "#boxTemplate",
    regions: {
        video: "#video",
        comments: "#comments"
    }
});
