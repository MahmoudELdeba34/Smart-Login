// var singnIn=document.getElementById('signIN');
// singnIn.addEventListener("click",function(){
//     window.location='./index.html'
// })

var userName = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var buttonSubmit = document.getElementById("submet");
var login = document.getElementById("login");
var human = document.getElementById("human");
var users = [];

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

// function for creating email:
function singnUp() {
  if (validationName() && validationEmail()) {
    var creatEmail = {
      name: userName.value,
      email: email.value,
      password: password.value,
    };
    if (chick()) {
      users.push(creatEmail);
      Swal.fire("Registration has been successful...");
      localStorage.setItem("users", JSON.stringify(users));
      console.log(users);
      clear();
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Your Name (must start with a capital letter) & Email & Password",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}

if (buttonSubmit !== null) {
  buttonSubmit.addEventListener("click", function () {
    singnUp();
  });
}

//chick
function chick() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email.value) {
      Swal.fire("This Mail Already Used !");
      return false;
    } else if (users[i].name == userName.value) {
      Swal.fire("This Name Already Used !");
      return false;
    } else if (users[i].password == password.value) {
      Swal.fire("This Password Already Used !");
      return false;
    }
  }
  return true;
}

//clear
function clear() {
  userName.value = "";
  email.value = "";
  password.value = "";
}

//validation
function validationName() {
  var regex = /^[A-Z][a-z]{3,20}[0-9]{0,3}$/;
  return regex.test(userName.value);
}

function validationEmail() {
  var regex = /@/;
  return regex.test(email.value);
}

//start login
// function chikedMail() {
//   for (var i = 0; i < users.length; i++) {
//     if ((users[i].email == email.value )|| (users[i].password == password.value) ){
//      goToHome()
//     }
//   }
//   if((users[i].email != email.value )||(users[i].password !=password.value) ) {
//     Swal.fire("Not Found This E-Mail and passwrod please Sign Up And Try Agin  !");
//   }

// }
//--------------------------------------------------------------------------------------
// the prevous code iam found erorr and a iam solve it in th next
function chikedMail() {
  var found = false; // Flag to check if user is found

  var human = document.getElementById("human");

  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email === email.value &&
      users[i].password === password.value
    ) {
      found = true;
      goToHome();

      break; // Exit the loop if a matching user is found
    }
  }
  if (!found) {
    Swal.fire(
      "Not Found This E-Mail and password. Please Sign Up And Try Again!"
    );
  }
}
if (login != null) {
  login.addEventListener("click", function () {
    chikedMail();
  });
}
function goToHome() {
  login.addEventListener("click", function () {
    window.location = "./home.html";
    setHumanName();
  });
}

function setHumanName() {
  if (localStorage.getItem("users") !== null) {
    users = JSON.parse(localStorage.getItem("users"));
    var cartona = "";
    for (var i = 0; i < users; i++) {
      cartona += `
    <li class="nav-item">
      <a class="nav-link active " aria-current="page" href="#">${users[i].name} </a>
    </li>
    `;
    }
  }
  if (cartona != null) {
    document.getElementById("human").innerHTML = cartona;
  }
}
var allItems = [];
var myHttp = new XMLHttpRequest();
myHttp.open("GET", "https://jsonplaceholder.typicode.com/posts");
myHttp.send();
myHttp.addEventListener("readystatechange", function () {
  if (myHttp.readyState == 4) {
    allItems = JSON.parse(myHttp.response);
  }
  // console.log(allItems);
  displayItem();
});
/* i give you two type for display */
//1-type one
// function displayItem() {
//   var cartona1 = "";
//   for (var i = 0; i < allItems.length; i++) {
//     if(cartona1!=null){
//     cartona1 += `
//     <div class="col-md-3" >
//     <div class="item" >
//         <h2>
//             ${allItems[i].title};
//         </h2>
//         <p>
//         ${allItems[i].body};
//         </p>
//     </div>
//    </div>
//     `;
//   }
// }
//   if (cartona1 != null) {
//     document.getElementById("rowItem").innerHTML = cartona1;
//   }
// }
//2- type two
function displayItem() {
  var cartona1 = "";
  for (var i = 0; i < allItems.length; i++) {
    cartona1 += `
      <div class="col-md-3">
        <div class="item">
          <h2>${allItems[i].title}</h2>
          <p>${allItems[i].body}</p>
        </div>
      </div>
    `;
  }

  var rowItemElement = document.getElementById("rowItem");
  if (rowItemElement !== null) {
    rowItemElement.innerHTML = cartona1;
  }
  // else {
  //   console.error("Element with id 'rowItem' not found.");
  // }
}
