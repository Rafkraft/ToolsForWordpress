/*
ItemView object that is used by the collectionView object, it represents each item 
that is rendered into the App.content region
*/

var itemView = Backbone.Marionette.ItemView.extend({
    events: {
        "mouseover":"mouseover",
        "mouseout":"mouseout"
    },
    initialize:function(options){

        //declaring model to simplify access to it
        var model = this.model.attributes;
        this.templateHelpers = {};

        //Getting timestamp out of date_upload and date_parution, not configured yet
        var pdate = model.date_parution.split('/');
        var pdate = pdate[2]*10000+pdate[1]*30+pdate[0]*1;
        this.model.attributes.pdate=pdate;
        this.templateHelpers.pdate = pdate;
        var udate = model.date_upload.split('/');
        var udate = udate[2]*10000+udate[1]*30+udate[0]*1;
        this.model.attributes.udate=udate;
        this.templateHelpers.udate = udate;

        this.templateHelpers.collection = options.page;

        //delay if video is recent, not configured yet
        var delais=0;

        this.templateHelpers.img = model.img;

        //Adding class "chaud" if video is recent, not configured yet
        this.templateHelpers.chaud="";
        if(udate>=options.date-delais){
            this.templateHelpers.recent='true';
            this.templateHelpers.chaud='<p class="chaud">CHAUD</p>';
        }
        else{
            this.templateHelpers.recent='false';
        }
        this.templateHelpers.chaud="";
        this.templateHelpers.recent='false';

        //Flag if language not configured yet
        this.templateHelpers.langue=""
        if(model.langue=='eng'){
            this.templateHelpers.langue = '<img class="flag" src="imgs/Flaguseu.jpg"/>';
        }
    },
    tagName:"div",  
    template : "#itemTemplate",
    mouseover:function(){
        $("#tagsWindow").css('opacity',1);
        $("#tagsWindow").css('display','block');
        $('#tagsWindow').html('');
        $('#tagsWindow').css({top:this.$el.offset().top+246,left:this.$el.offset().left+0});
        for(i=0; i<this.model.attributes.tags.length; i++){ 
            if(this.model.attributes.tags.length>0){
                $('#tagsWindow').append('<span class="tag">'+this.model.attributes.tags[i]+'</span>');
            }
        };
        $(".item").css('opacity',0.8);
        $(this.$el).find(".item").css('opacity',1);
    },
    mouseout:function(){
        $(".item").css('opacity',1);
        $("#tagsWindow").css('opacity',0);
        $("#tagsWindow").css('display','none');
    }
})

/*
Main collection view constructor, today's date is calculated so this calcul has not to be processed for each model rendered.
Page name, count collection and date are sent to each model.
*/
var collectionView= Backbone.Marionette.CollectionView.extend({
    appendHtml: function(collectionView, itemView){
        console.log(collectionView);
        collectionView.$el.prepend(itemView.el);
    },
    initialize:function(options){
        // date d'aujourd'hui
        var FD = new Date();
        var TDM = FD.getMonth()+1;if(TDM.length==1) TDM="0" +TDM;
        var TDD = FD.getDate()+"";if(TDD.length==1) TDD="0" +TDD;
        var date = FD.getFullYear()*10000+TDM*30+TDD*1;
        this.date = date    
        this.options = options;         
    },
    childViewOptions: function(){
        return{ page: this.options.infos.name,
                //count: this.options.infos.count,
                date: this.date 
            }
    },
    onRender:function(){
        $('#nav a').removeClass('active');
        $("#nav a[value='"+this.options.infos.name+"']").addClass('active');
        if(this.options.infos.background){
            console.log(this.options.infos.name);
            $('body').css('background-image','url('+this.options.infos.name+'/background.jpg)');
            $('body').css('background-attachment','fixed');
            $('body').css('background-size','100% auto');
        }else{
            $('body').removeAttr('style');
        }
    },
    childView: itemView
});