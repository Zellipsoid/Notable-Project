How to run app:

1. Run "yarn install" in both server and client directories
2. In the server directory, copy envexample to a file called ".env", and fill in the MongoDB database string (you can make one at https://www.mongodb.com/) along with a session secret. The secret can be any string.

[For Production (sort of - this app still needs more work to be put into a production environment, so this is for the future)]
3a. In the client directory, run "yarn build"
4a. In the server directory, run "yarn start"
5b. The client will be served at localhost:4000 

[For Development]
3b. In the client directory, run "yarn start"
4b. In the server directory, run "yarn start"
