
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      // User is signed in.
      console.log('You can Reading');
    //   reloadpage();
     
        //LoadOnce();
    } else {
      // No user is signed in.
       setTimeout(function () {
              location.href="index.html";
            }, 1200);
     
    }
  });
