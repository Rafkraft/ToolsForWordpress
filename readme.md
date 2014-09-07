## Tools for wordpress

I developped two distinct tools to put in the wordpress root directory. 

### /tv





The /tv folder is a Backbone/Marionette.js driven application that allows you to display a custom video flow on your website, the video be add automatically thru cron jobs or others, or added manually, they can come from 3 differents platform for the moment: youtube, dailymotion and vimeo.

The user will be able to see al the video, look for one in particular, and eventually like or comment the videos.

Eveything about it and how to configure it is explain in the readme.md file inside the tv folder.

### /thread

The /thread folder is a Backbone/Marionette.js driven application, allowing you to present a multi-page "Dossier" on any subject you want. Like the /tv application, everything is parametrically driven, so you've got to modify just a few lines in the index.html file, add yout articles in the /articles folder and you're done, the articles are displayed nicely on the [wordpress install directory]/thread page. Once again everything is explain inside in the readme.md file.


These to application use the wordpress user management system to identify or verify if a user is logged, in order to work, these to folders have to be placed in the root directory, and the info.php file added to your wordpress root directory as well.

