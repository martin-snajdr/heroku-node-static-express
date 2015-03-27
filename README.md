#Serve static HTML files build with grunt from heroku

Ready to deploy and run NodeJS Server to serve static files from heroku built with grunt.

##What's in it

* NodeJS Express to serve static files from `build`-directory
* Optional HTTP Auth (uncomment lines in `server.js`)
* Grunt Task to build SCSS, Javascript and Kit-Files ([What is kit?](http://incident57.com/codekit/help.html#kit))
* Grunt LiveReload included

##How to use

First, create a new heroku app

	heroku create heroku-node-static-express --region eu
	
Then push your repo to heroku

	git push heroku master
	
It's up an running! Almost...

Because...

Not a single grunt task has run! So basically no CSS files, Javascript or compiled HTML documents exist.

You can run the grunt task manually:

	heroku run grunt
	
This works fine, but it's not quite handy when you have to do this everytime you push a new commit to heroku.

Using a custom buildpack you can do this automatically after pushing a commit.
I use the customized Heroku Buildpack with Grunt support by Matthis Buchetics, you can find it at [https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt](https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt).

Adding it to your heroku app is easily done by adding some environment variables:
	
	heroku config:set BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
	heroku config:set NODE_ENV=production
	heroku config:set PORT=80
	
That's it! Now, everytime you push a commit, your default grunt task is executed.
	
*Also see blog post at http://snajdr.de/serve-static-html-files-build-with-grunt-from-heroku/*