# For Developers
### Build
There are two build files. They are both python scripts that grab the various files needed and combine them into one file that can be easily pasted into an americares pagebuilder page.

The first build file [build.py](https://github.com/BenCommet/americares-responsive-donation-page/blob/master/build.py) does the following
* Creates a new file called publish.html
* Opens up the styles.css, api.js and script.js files and throws them into the correct places in the donate.html page.
* Removes all local javascript and CSS links used for local testing
* Saves all that combined goodness into one file, all ready to be inserted into that oh so delightful Blackbaud WISYWIG

The second file ([build-wrapper.py](https://github.com/BenCommet/americares-responsive-donation-page/blob/master/build-wrapper.py))is the wrapper for the page. You will need this wrapper to ovewrite any of the default wrappers since they will have media queries that will demolish the CSS. It does essentially the same job as [build.py](https://github.com/BenCommet/americares-responsive-donation-page/blob/master/build.py), except there is no javascript and it is output to the wrap-publish.html file.