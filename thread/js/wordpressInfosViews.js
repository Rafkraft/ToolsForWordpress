    //Wordpress Infos View
    var WordpressInfosView = Backbone.Marionette.ItemView.extend({
        events:{
            "click #disconnect":"disconnect",
            "click #sendButton":"connect"
        },
        initialize:function(options){
            this.templateHelpers={};

            this.templateHelpers.pseudo=window.wordpressInfos.userLogin;
        },
        disconnect:function(){
            //var data ={data:"super"};
            var iframe = '<iframe src='+'"'+window.wordpressInfos.logOutUrl+'"'+'></iframe>'; 
            $('#iframe').html(iframe);
            
            setTimeout(function(){
                location.reload();
            }, 500);
        },
        connect:function(){
            var pseudo = $('#pseudoConnect').val();
            var password = $('#passwordConnect').val();
            var data = {
                'log':pseudo,
                'pwd':password, 
                'wp-submit':'Se-connecter', 
                'redirect_to':'', 
                'instance':'',
                'action':'login'
            };
            $.ajax({
                type: "POST",
                url: "../?page_id=34",
                data: data,
                success: function(result) {
                console.log(result);
                    setTimeout(function(){
                        location.reload();
                    }, 500);
                },
                dataType: "text"
            });
        }
    });

    //Wordpress Form View
    var WordpressFormView = Backbone.Marionette.ItemView.extend({
        template: "#wordpressFormTemplate",
        initialize:function(options){
            this.templateHelpers={};
            this.templateHelpers.pseudo="";
        }
    });