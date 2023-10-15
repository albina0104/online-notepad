# Online Notepad - made with React and Firebase

## Project objectives
After finishing a LinkedIn Learning course [Building Production-Ready React Apps: Setup to Deployment with Firebase](https://www.linkedin.com/learning/building-production-ready-react-apps-setup-to-deployment-with-firebase), where we created an image gallery, create another similar project that uses the same technologies, in order to practice what was learned in the course, to reinforce the gained knowledge.

## Used technologies / resources / tools
- [React](https://react.dev/) - JS library
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) framework
- [Firebase](https://firebase.google.com/) services:
  - Cloud Firestore - a NoSQL database to store data
  - Firebase Authentication
  - Firebase Hosting
- [Emojipedia](https://emojipedia.org/) - used emoji as icons
- [UXWing SVG Icon Editor](https://uxwing.com/svg-icon-editor/) - used an online editor to create my own favicon

## Notepad features
- Login with Google
- Create colorful note cards, view, edit, delete, search notes
- View your profile information

## What I practiced / learned
- This is my first React project created with [Vite](https://vitejs.dev/) instead of Create React App.
  
  I learned that env variables in Vite are exposed via `import.meta.env.` instead of `process.env.`, and should start with `VITE_` in order to be exposed to the client source code, e.g. `import.meta.env.VITE_FIREBASE_API_KEY`.

- I practiced implementing Firebase services in my app.
  - Cloud Firestore is used to store notes created in the app.
  - Firebase Authentication is used for authentication with Google.
  - Firebase Hosting is used to host the website.

- React Router:
  - Learned about a new type of routers - data routers. At first, I implemented loaders for the routes, but later realised it was not a good idea, as they load data only during the initial render, and it was not suitable in my case, so I had to replace loaders with useState / useEffect / useReducer.
  - Practiced using hooks: useLoaderData, useParams, useLocation, useNavigate, useRouteError
  - Learned to create protected routes, which redirect to the homepage if the user is not authorized to see the page. This was another reason to replace data loaders, they loaded data even if the route was protected and the user was not authorized to load the data.

- React: 
  - Practiced using hooks: useState, useEffect, useReducer, useRef
  - Practiced creating and using Context, creating custom Context hooks
  - Learned how to update data in input fields

- JavaScript:
  - Learned how to use async/await in practice
  - Learned that it's not possible to return a value from a callback, but it becomes possible if we create a Promise, then we can return a value by resolving the Promise.

  ```js
  getCurrentUser: () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });
  },
  ```

  - Understood the difference between asynchronous and synchronous functions
  - Learned that the `try-catch` block and `.catch` are different, and in which case each one is used

## How to start, build and deploy the app
```bash
$ npm run dev
$ npm run build
$ firebase deploy # includes Firebase configurations, security rules
# or
$ firebase deploy --only hosting
```

## Links
- Repository URL: [https://github.com/albina0104/online-notepad](https://github.com/albina0104/online-notepad)
- Live site URL: [https://online-notepad-397211.web.app/](https://online-notepad-397211.web.app/)

## Author
- GitHub - [albina0104](https://github.com/albina0104)
