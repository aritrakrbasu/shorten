![alt text](https://github.com/aritrakrbasu/shorten/blob/master/SHORTEN.png?raw=true)

# Shorten

shorten is a free custom url builder made with 

- React js
- Firebase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get started
>[open Firebase account](http://www.github.com/) 

> Register a account (free acoungt will also work)

> Click on Develop on the left side menu 

> Click on Authentication -> Sign in method -> Email/Password -> enable and save

> Click on Database -> Create a database -> click on rules and paste the code below 
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
    	 allow read;
      allow write: if request.auth.uid!=null;
    }
  }
}
```
> On the dashboard click on this icon </> and you will get your credentials 

> Open the folder 'src' -> edit 'firbase_config.js' and paste your credentials here

``` 
const config = {
    apiKey: "#####",
    authDomain: "#####",
    databaseURL: "#####",
    projectId: "#####",
    storageBucket: "#####",
    messagingSenderId: "#####",
    appId: "#####",
    measurementId: "#####"
      };
 ```
 
 > Enter your domain here 
 ```
    export const domain = 'http://localhost:3000';
 ```
 ### Now you can use your app shortner <3
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


