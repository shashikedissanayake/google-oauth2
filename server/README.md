# google-oauth2-server-app
Created a simple Node JS project to tryout Google oAuth 2.0 with PasssportJs

## Installation

- Install application dependencies using  `npm install` or `yarn`.
- Create an `keys.json` file inside config folder with keys described in Config Keys section.
- Create a project in https://console.cloud.google.com/apis and credentials in order to use Google oAuth APIs. 

## Running

- `npm install -g nodemon` - Install nodemon globally in your computer.
- `npm run start:dev` - will run application in development mode.

## Config keys

Following Json objects need to be declare inside `keys.json` file.

```json
{
    "mongodb": {
        "dbURI": "MongoDb URI to connect to Database"
    },
    "googleOauth": {
        "clientID": "Credential:clientID of the project created in https://console.cloud.google.com/apis",
        "clientSecret": "Credential:clientSecret of the project created in https://console.cloud.google.com/apis"
    },
    "jwtSecret": {
        "secret": "JWT secret use to sign and verify tokens"
    }
}
```
