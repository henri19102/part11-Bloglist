# Bloglist App

Here you can read configuration and installation instructions for this app. The app is from the final exercise of the part 7 from MOOCs Full stack course.

# Prerequisites

Install [node.js] version 15

Check your install with `node -v && npm -v`

Install yarn if not already installed: `npm install yarn`

Install all packages with `yarn install`

# Starting in production mode

First you need to build the static files with `npm run build`

The app uses MongoDB database so you have to connect to MongoDB in order to use this app. Use `MONGODB_URI` environment variable to set your MongoDB URI.

Use command `node index.js` to run the app.

The app uses port 3003 in default, but you can change it by using `PORT` environment value.

Finally you can use `SECRET` variable to generate tokens.

Test that the project is running by going to <http://localhost:3003>



