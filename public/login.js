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
    getLogonDate(uid).then(snap => {
      lastLogon = snap.val().lastLogon;
      console.log(lastLogon);
      if(lastLogon == null){
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
        console.log(lastLogon);
        let lastLogonDateObj = new Date(lastLogon * 1000)
        let currentDate = new Date();
        if(lastLogonDateObj.getFullYear() - currentDate.getFullYear() < 1){
          if(lastLogonDateObj.getMonth() - currentDate.getMonth() < 1){
            if(lastLogonDateObj.getDate() - currentDate.getDate() < 1){
              setLogonDate(uid, Date.now());
              console.log("no goal change needed")
            } else {
              setLogonDate(uid, Date.now());
              changeGoal(uid, "use a bicycle instead of driving", "false");
              changeGoal(uid, "put something in the recycling bin", "false");
              changeGoal(uid, "don't use a disposable plastic waterbottle", "false");
              changeGoal(uid, "walk outside for at least 15 mins", "false");
            }
          } else {
            setLogonDate(uid, Date.now());
            changeGoal(uid, "use a bicycle instead of driving", "false");
            changeGoal(uid, "put something in the recycling bin", "false");
            changeGoal(uid, "don't use a disposable plastic waterbottle", "false");
            changeGoal(uid, "walk outside for at least 15 mins", "false");
          }
        } else {
          setLogonDate(uid, Date.now());
          changeGoal(uid, "use a bicycle instead of driving", "false");
          changeGoal(uid, "put something in the recycling bin", "false");
          changeGoal(uid, "don't use a disposable plastic waterbottle", "false");
          changeGoal(uid, "walk outside for at least 15 mins", "false");
        }
      }
      getGoals(uid).then(snap => {
        var innerHTML = "";
        for (var goal in snap.val()) {
          innerHTML += '<li class="list-group-item align-items-center"><input class="ml-2" type="checkbox" style="float:left;"><p style="float:right;">'+goal+'</p></li>';
        }
        document.getElementById("goals").innerHTML = innerHTML;
      });
    });
  } else {
    // User is signed out.
    document.getElementById("login-button").innerHTML = loginBtnHtml;
    document
      .getElementById("login-button")
      .removeEventListener("click", signOut);
    document.getElementById("login-button").addEventListener("click", signIn);
  }
});


