import React from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: "fir-react-intro.firebaseapp.com"
});

export default class App extends React.Component {
  state = { isLoggedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <>
            <p>Logged in</p>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
            <p>hello {firebase.auth().currentUser.displayName}</p>
          </>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}
