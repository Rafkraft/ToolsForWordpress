## /thread

###Config your file

First of all, you've got to config your winfow.config Object, in the actual index.html, you'll see that there is 3 articles, that you can see when loading the /thread/ page, ski snowboard and planche à voile.

In the window.config you can add as many objects as you want:
+ id: it is important to set the id, it's going to determine if the arrow will be displayed at the left and right of the page.
+ name: it is the string that will identifie the article in the url, wich will be "thread/#page/ski" for example for the ski article.
+ completeName: the full name, where you can add space and anything that can not be in the url, it is going to be displayed in the navigation bar.
+ URL: the url of the article .txt file. If you add an article about sharks, simply create a sharks.txt file in the article folder, and you're going to set the URL as "articles/sharks.txt".
+ comments : the url of the wordpress article for wich you want to link comments to the article. So you've got to have a wordpress article for each thread article, and it's important to have the permaling setting as default in your wordpress setting: "?p=12" for example.
+ pageID : the wordpress url id, this setting is not used for the moment, just enter the same number.

###Default Article

In the home method of the Router object (line 86 if there is 3 articles object), it's important to set the default article that will be displayd, replace "snowboard" by any of yout article.


With thises two basig config, you should be done, the articles are going to be displayed automatically, and url dynamic routing sould work as well. Don't forget to add the twitter button in yout txt file, like in the presents article.


Rafkraft

