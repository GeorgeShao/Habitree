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

let uid;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    var providerData = user.providerData;
    document.getElementById("login-button").innerHTML = logoutBtnHtml;
    document
      .getElementById("login-button")
      .removeEventListener("click", signIn);
    document.getElementById("login-button").addEventListener("click", signOut);
    getLogonDate(uid).then(snap => {
      if(snap.val() == null){
        // initialize account
        createGoal(uid, "use a bicycle instead of driving", "a");
        createGoal(uid, "put something in the recycling bin", "l");
        createGoal(uid, "don't use a disposable plastic waterbottle", "w");
        createGoal(uid, "walk outside for at least 15 mins", "l");
        createEcosystemState(uid, "trees", 3);
        createEcosystemState(uid, "clouds", 3);
        createEcosystemState(uid, "lake", 3);
        setLogonDate(uid, Date.now());
      } else {
        // check if its been one day since last logon
        lastLogon = snap.val().lastLogon;
        console.log(lastLogon);
        let currentDate = new Date();
        // divide by 86400000 (milliseconds in a day) and round down to get days past since 1970 00:00:00 UTC
        // if different day, reset goals
        let diff = Math.floor(currentDate/86400000) - Math.floor(lastLogon/86400000)
        if (diff > 0) {
          getGoals(uid).then(snap => {
            let data = snap.val();
            for (var goal in data) {
              changeGoal(uid, goal, "false");
            }
          });
          changeEcosystemState(uid, "trees", -3*diff);
          changeEcosystemState(uid, "clouds", -3*diff);
          changeEcosystemState(uid, "lake", -3*diff);
        }
        setLogonDate(uid, currentDate);
      }
      getGoals(uid).then(snap => {
        var innerHTML = "";
        let data = snap.val();
        for (var goal in data) {
          let goalID = goal.replace(/ /g, "-");
          innerHTML += '<li class="list-group-item each-card" style="background-color: lightgray;">' + goal + '<input id="' + goalID + '" class="ml-2" type="checkbox" style="float: right;" onchange="onChanged(this)"' + (data[goal].complete == true ? 'checked' : '') + '></li>';
        }
        document.getElementById("goals").innerHTML = innerHTML;
      });
      document.getElementById("add").innerHTML = '<input type="text" id="userGoal"><button type="submit" onclick="addGoal()" >Add Goal</button>';
      loadImages(uid);
    });
  } else {
    // User is signed out.
    document.getElementById("login-button").innerHTML = loginBtnHtml;
    document
      .getElementById("login-button")
      .removeEventListener("click", signOut);
    document.getElementById("login-button").addEventListener("click", signIn);
    document.getElementById("goals").innerHTML = "Log in to view your goals!";
    document.getElementById("add").innerHTML = "";
    document.getElementById("clouds").src = "";
    document.getElementById("trees").src = "";
    document.getElementById("pond").src = "";
  }
});


