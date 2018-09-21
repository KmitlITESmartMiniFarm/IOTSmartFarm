
function saveData() {

    var firstname = document.getElementById('first_name');
    var lastname = document.getElementById('last_name');
    var displayname = document.getElementById('display_name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirmpassword = document.getElementById('password_confirmation');

    var firstnameV = document.getElementById('first_name').value;
    var lastnameV = document.getElementById('last_name').value;
    var displaynameV = document.getElementById('display_name').value;
    var emailV = document.getElementById('email').value;
    var passwordV = document.getElementById('password').value;
    var confirmpasswordV = document.getElementById('password_confirmation').value;


    if (firstnameV == "") {
        swal("Oops...", "First Name must be filled out", "error");
        return false;
    }
    else if (lastnameV == "") {
        swal("Oops...", "Last Name must be filled out", "error");
        return false;
    }
    else if (displaynameV == "") {
        swal("Oops...", "DisplayName must be filled out", "error");
        return false;
    }
    else if (passwordV != confirmpasswordV) {
        swal("Oops...", "Password no Match!", "error");
        return false;
    }
    else {
        insertData(first_name.value, last_name.value, display_name.value, email.value, password.value, password_confirmation.value)
        console.log('insertData Process!');
    }
}

function insertData(first_name, last_name, display_name, email, password, password_confirmation) {

    var firebaseRef = firebase.database().ref("users");
    firebaseRef.push({
        firstname: first_name,
        lastname: last_name,
        displayname: display_name,
        email: email,
        password: password,
        confirmpassword: password_confirmation
    });

    console.log("Insert Success");
    signUp();
}

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function (result) {
            swal("Congrats!", ", Your account is created!", "success", { button: false });

            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    )
        .catch(error => {
            // Handle Errors here.
            var errorMessage = error.message;
            swal("Oops...", errorMessage, "error");
        });

}


function signIn() {
    var email = document.getElementById('email_login').value;
    var password = document.getElementById('password_login').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(
        function (result) {

            swal("Welcome!", ", Your account is Active!", "success", { button: false });

            setTimeout(function () {
                location.reload();
            }, 2500);

        }
    )
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                swal("Wrong password");
            } else {
                swal(errorMessage);
            }
        });
}


function logout() {
    firebase.auth().signOut().then(
        function(result){
            swal("Good Bye!", "Your accout is Logout!", "success");
            console.log('Logout!');
        }
    )
    
}


