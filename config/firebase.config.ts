import {AuthProviders, AuthMethods} from 'angularfire2';
export const firebaseConfig = {
  apiKey: "AIzaSyAeBsR3V8lRNe8hC9-8xTjSTc3XnXFsFv4",
  authDomain: "nchat-a32fc.firebaseapp.com",
  databaseURL: "https://nchat-a32fc.firebaseio.com",
  storageBucket: "nchat-a32fc.appspot.com",
  messagingSenderId: "259059066255"
};
export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
