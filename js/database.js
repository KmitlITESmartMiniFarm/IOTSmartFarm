
function saveData(){
   
   console.log("Success Loading!!")

    var firstname = document.getElementById('first_name');
    var lastname = document.getElementById('last_name');
    var displayname = document.getElementById('display_name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirmpassword = document.getElementById('password_confirmation');
    insertData(first_name.value, last_name.value, display_name.value, email.value, password.value, password_confirmation.value)
}

function insertData(first_name, last_name, display_name, email, password, password_confirmation){

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

function signUp(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/weak-password'){
            alert('The password is too weak');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        console.log('Auth Success');
    });
}

function signIn(){
    var email = document.getElementById('email_login').value;
    var password = document.getElementById('password_login').value;
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/wrong-password'){
            alert('Wrong password');
        } else {
            alert(errorMessage);
        } 
    });
    alert('loggined');
}