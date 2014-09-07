## /tv

This App has been developped by Rafkraft, it uses diverses technologies like Underscore.js, Backbone.js and Marionette.js, it is all one paged, no hypertext links, so the content is loaded dynamically. You can add automatic youtube fetching, to keep your plateform updated with the youtube channels you want to share. Add as much section as you want. You can understand how it works in three points:


### configure your config object

+ In the index.html file, find the window.config object, this object within the array represents a collection, for example there is two in the current example, four keys:
    - name: the url that will be used, it must match the collection folder name.
    - completeName: the full collection name that will be displayed in the #search section.
    - tags: an array containing the tags you want to propose to the user. Optionnal.
    - background : if set to true, the background image will change each time the collection is loaded, and the backgroud.jpg file in the collection folder will be fetched.


### Create your collection

+ Now that you added the collection, you've got to create the folder that will match the route that will be called. Let's create a new collection:
    - Copy the "example" folder, rename it with the collection name you choose to add to the window.config object.
    - Empty the data.json file, but not totally, let an empty array inside it : "[]" without the quotes.


### Configure your getData.php file

+ Now you just have to configure your getData.php file so the videos of the channels you want to add to your collection will be loaded from youtube API. Two things left in the getData.php file:
    - You have to add/remove youtube channels in the $config variable (line 9). Add the name of the channel first (you can keep the channel's name or change it), and add its ID that you can find by looking for the "data-channel-external-id" variable on the channel's youtube page source code.
    - Add your Youtube api key in the youtubeApiKey variable.

### Add videos manually

This application includes a "backoffice" allowing you to add manually any youtube/dailymotion/vimeo video to your plateform.

Within every collection, a admin.html file should be present, simply open it and it will fetch every video object in the data.json file. 
+ In order to edit/create a video :  fill the "id" field with the id of the video you want to edit, click on the "Rechercher" button, if this id exists, all data will be displayed.
+ In order to create a new video : simply fill the "id" field with a new id, if there is 30 elements in your collection for example, the new id will be "30" (because the first is 0). Then fill all the fields, and click "Envoyer".
+ In order to save the edited content: click on "Envoyer", the model will be sent into the textarea, but not into the data.json file. 
+ In order to definitly save it, click on "Enregistrer", the data will be saved in the data.json file.
