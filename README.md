
# MyFlix API

The Movie API is a server-side component of a “movies” web app, that includes a database created with MongoDB, the server, and the business logic layer. 

The application provides authenticated users with access to movies information. They can add movies to their favourite list, as well as common abilities as to change or delete their profile. The REST API will be accessed by CRUD operations.

## Tools
 - NodeJS
 - Express
 - MongoDB

## Getting Started
The easiest way to get started is to clone the repository:

1. Clone the repository
2. Git clone https://github.com/iamnachoj/Movie-API/
3. Change directory
4. cd Movie API
5. Install NPM dependencies
6. Start the server
Note: It is recommended to install nodemon for livereloading - It watches for any changes in your node.js app and automatically restarts the server

## Deployment
### Deployment to Heroku

Download and install Heroku CLI

In a terminal, run heroku login and enter your Heroku credentials

From your app directory run heroku create

Use the command heroku config:set KEY=val to set the different environment variables (KEY=val) for your application (i.e. heroku config:set BASE_URL=[heroku App Name].herokuapp.com etc.)

Do git add .

Do git commit -m" reason for commit"

Lastly, do git push heroku master.

Please note that you may also use the Heroku Dashboard to set or modify the configurations for your application.

## view live demo: link <a href="https://myflix-lounge.herokuapp.com/">here! </a>
I used postman to test the api. To use postman, go to the project doc folder and import the docs file into your postman client to ease the testing

Don´t forget to check out the documentation endpoint (/Documentation) in order to know how to send every HTTP request.

