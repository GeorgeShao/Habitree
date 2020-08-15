var loginBtnHtml = `<img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />Sign in with Google`;
var logoutBtnHtml = `<img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />Logout`;

function signIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    firebase.auth().signInWithRedirect(provider);
  }
}

function signOut() {
  return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    document.getElementById("login-button").innerHTML = logoutBtnHtml;
    document
      .getElementById("login-button")
      .removeEventListener("click", signIn);
    document.getElementById("login-button").addEventListener("click", signOut);
    if(getLogonDate(uid) == null){
        // initialize account
        createGoal(uid, "use a bicycle instead of driving", "a");
        createGoal(uid, "put something in the recycling bin", "l");
        createGoal(uid, "don't use a disposable plastic waterbottle", "w");
        createGoal(uid, "walk outside for at least 15 mins", "l");
        createEcosystemState(uid, "trees", 5);
        createEcosystemState(uid, "clouds", 5);
        createEcosystemState(uid, "lake", 5);
        setLogonDate(uid, Date.now());
    } else {
        // check if its been one day since last logon
    }
    document.getElementById("goals").innerHTML = getGoals(uid);
  } else {
    // User is signed out.
    document.getElementById("login-button").innerHTML = loginBtnHtml;
    document
      .getElementById("login-button")
      .removeEventListener("click", signOut);
    document.getElementById("login-button").addEventListener("click", signIn);
  }
});

