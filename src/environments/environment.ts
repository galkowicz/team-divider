// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyDC3q4RSrknijvGzota4s5tWGpLF-ZJSsc',
    authDomain: 'team-divider-6b8da.firebaseapp.com',
    databaseURL: 'https://team-divider-6b8da.firebaseio.com',
    projectId: 'team-divider-6b8da',
    storageBucket: 'team-divider-6b8da.appspot.com',
    messagingSenderId: '450932407079'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
